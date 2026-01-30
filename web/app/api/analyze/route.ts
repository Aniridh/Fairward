import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { MOCK_DATA, ProcedureData, HospitalPrice } from "@/lib/data";
// @ts-ignore
const pdf = require("pdf-parse");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    let messages;

    // HANDLE PDF FILES
    if (file.type === "application/pdf") {
        try {
            const data = await pdf(buffer);
            const textContent = data.text;
            
            if (!textContent || textContent.trim().length === 0) {
                 throw new Error("Empty PDF text");
            }

            messages = [
                {
                  role: "system",
                  content: `You are an expert medical bill auditor. Your job is to extract the MAIN procedure, its CPT code, and the total billed amount from the text of a medical bill.
                  
                  Return ONLY valid JSON with this structure:
                  {
                    "procedureName": "string (e.g. MRI Brain w/o Contrast)",
                    "cptCode": "string (e.g. 70553)",
                    "billedAmount": number (raw number, no currency symbols)
                  }
        
                  If you cannot find a CPT code, infer the most likely one based on the description.
                  If multiple procedures are listed, choose the most expensive one.`
                },
                {
                  role: "user",
                  content: `Analyze this medical bill text:\n\n${textContent.substring(0, 15000)}` // Truncate to avoid context limits
                },
            ];
        } catch (e) {
            console.error("PDF Parse Error:", e);
            return NextResponse.json(
                { error: "Could not read PDF text. Please upload an Image (JPG/PNG) instead." }, 
                { status: 400 }
            );
        }
    } 
    // HANDLE IMAGE FILES
    else {
        const base64Image = buffer.toString("base64");
        const dataUrl = `data:${file.type};base64,${base64Image}`;

        messages = [
            {
              role: "system",
              content: `You are an expert medical bill auditor. Your job is to extract the MAIN procedure, its CPT code, and the total billed amount from an image of a medical bill.
              
              Return ONLY valid JSON with this structure:
              {
                "procedureName": "string (e.g. MRI Brain w/o Contrast)",
                "cptCode": "string (e.g. 70553)",
                "billedAmount": number (raw number, no currency symbols)
              }
    
              If you cannot find a CPT code, infer the most likely one based on the description.
              If multiple procedures are listed, choose the most expensive one.`
            },
            {
              role: "user",
              content: [
                { type: "text", text: "Analyze this medical bill." },
                {
                  type: "image_url",
                  image_url: {
                    url: dataUrl,
                  },
                },
              ],
            },
        ];
    }

    // Call OpenAI GPT-4o
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: messages as any,
      response_format: { type: "json_object" },
    });

    const content = response.choices[0].message.content;
    if (!content) {
      throw new Error("No content from OpenAI");
    }

    const result = JSON.parse(content);
    
    // Logic:
    // 1. If it matches our hardcoded MRI Brain (70553), use our high-quality mock data but override the "userPrice".
    // 2. If it's something else, generate a generic "fair price" comparison.
    
    let responseData: ProcedureData;

    if (result.cptCode === "70553" || result.procedureName.toLowerCase().includes("mri brain")) {
      // Use the high-quality mock structure, but update the user's billed price
      const base = MOCK_DATA["mri_brain"];
      responseData = {
        ...base,
        userPrice: result.billedAmount,
        comparison: [
          { name: "You Paid", price: result.billedAmount, fill: "#EF4444" },
          ...base.comparison.filter(c => c.name !== "You Paid")
        ]
      };
    } else {
      // Generate generic comparison
      // Fair price is typically 15-25% of billed charge (fake logic for demo)
      const fairPrice = Math.round(result.billedAmount * 0.22); 
      
      responseData = {
        id: "gen_" + Date.now(),
        code: result.cptCode || "Unknown",
        name: result.procedureName,
        userPrice: result.billedAmount,
        fairPrice: fairPrice,
        comparison: [
          { name: "You Paid", price: result.billedAmount, fill: "#EF4444" },
          { name: "City Gen", price: fairPrice, fill: "#22C55E" },
          { name: "Memorial", price: Math.round(fairPrice * 1.3), fill: "#94A3B8" },
          { name: "Valley", price: Math.round(fairPrice * 1.15), fill: "#94A3B8" },
          { name: "Northside", price: Math.round(fairPrice * 1.4), fill: "#94A3B8" },
        ]
      };
    }

    return NextResponse.json(responseData);

  } catch (error) {
    console.error("Analysis failed:", error);
    return NextResponse.json(
      { error: "Failed to analyze bill" }, 
      { status: 500 }
    );
  }
}
