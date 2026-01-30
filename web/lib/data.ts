export interface HospitalPrice {
  name: string;
  price: number;
  fill: string;
}

export interface ProcedureData {
  id: string;
  code: string;
  name: string;
  userPrice: number;
  fairPrice: number;
  comparison: HospitalPrice[];
}

export const MOCK_DATA: Record<string, ProcedureData> = {
  "mri_brain": {
    id: "mri_brain",
    code: "70553",
    name: "MRI Brain (w/o Contrast)",
    userPrice: 4200,
    fairPrice: 480,
    comparison: [
      { name: "You Paid", price: 4200, fill: "#EF4444" }, // Red-500
      { name: "City Gen", price: 480, fill: "#22C55E" }, // Green-500
      { name: "Memorial", price: 650, fill: "#94A3B8" }, // Slate-400
      { name: "Valley", price: 550, fill: "#94A3B8" }, // Slate-400
      { name: "Northside", price: 720, fill: "#94A3B8" }, // Slate-400
    ]
  }
};
