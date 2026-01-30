'use client';

import { useState } from 'react';

// Toggle this to false to use the Real AI we built earlier!
const USE_MOCK_DATA = true; 

/* ---------------- MOCK DATA ---------------- */

const MOCK_BILL_RESULT = {
  procedure: 'MRI Brain with and without contrast',
  cpt: '70553',
  billed_amount: 4200,
  fair_price: 480,
  overcharge_multiplier: 8.7,
  hospital: 'Valley Regional Medical Center',
  confidence_score: 98,
  medicare_rate: 320,
  commercial_avg: 550,
  code_audit: "CPT 70553 is frequently upcoded from 70551. However, description matches.",
};

const MOCK_BLOOD_RESULT = {
    procedure: 'Comprehensive Metabolic Panel',
    cpt: '80053',
    billed_amount: 650,
    fair_price: 45,
    overcharge_multiplier: 14.4,
    hospital: 'Northside Medical Group',
    confidence_score: 95,
    medicare_rate: 32,
    commercial_avg: 58,
    code_audit: "This is a routine automated test often bundled with office visits.",
};

const MOCK_ER_RESULT = {
    procedure: 'Emergency Room Visit, Level 3',
    cpt: '99203',
    billed_amount: 850,
    fair_price: 200,
    overcharge_multiplier: 4.3,
    hospital: 'City General Hospital',
    confidence_score: 89,
    medicare_rate: 110,
    commercial_avg: 240,
    code_audit: "Level 3 requires moderate complexity decision making. Verify physician notes.",
};

const PRICE_DATA = [
  { hospital: 'Valley Regional Medical Center', price: 4200 },
  { hospital: 'Bay Imaging Center', price: 480 },
  { hospital: 'South Bay Diagnostics', price: 650 },
  { hospital: 'Peninsula Imaging', price: 720 },
  { hospital: 'Santa Clara Medical Pavilion', price: 890 },
];

/* ---------------- PAGE ---------------- */

export default function Home() {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDemo = (type: 'mri' | 'blood' | 'er') => {
    setLoading(true);
    let data;
    switch(type) {
        case 'mri': data = MOCK_BILL_RESULT; break;
        case 'blood': data = MOCK_BLOOD_RESULT; break;
        case 'er': data = MOCK_ER_RESULT; break;
    }
    
    setTimeout(() => {
        setResult(data);
        setLoading(false);
    }, 1500);
  };

  const handleUpload = async (e?: React.ChangeEvent<HTMLInputElement>) => {
    // For file upload, default to MRI if filename doesn't match
    // or we can just treat it as MRI for the general "upload" button
    handleDemo('mri');
  };

  return (
    <main className="min-h-screen bg-gray-50 p-8 text-gray-900">
      <div className="max-w-3xl mx-auto space-y-8">

        {/* HEADER */}
        <header>
          <h1 className="text-4xl font-bold text-gray-900">Fairward</h1>
          <p className="text-gray-600 text-lg">
            Your AI Healthcare Advocate
          </p>
        </header>

        {/* UPLOAD */}
        {!result && (
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 bg-white text-center hover:border-blue-500 hover:shadow-lg transition-all">
            {loading ? (
              <div className="space-y-4">
                <div className="animate-spin w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full mx-auto"></div>
                <p className="text-xl font-medium text-blue-700">AI is auditing your bill...</p>
                <p className="text-sm text-gray-500">Checking 14,000+ negotiated rates...</p>
              </div>
            ) : (
              <>
                <p className="mb-6 text-xl font-medium text-gray-900">
                  Upload your medical bill to audit
                </p>
                
                <div className="flex flex-col items-center gap-4">
                    <label 
                        className="px-8 py-4 bg-black text-white text-lg font-semibold rounded-lg hover:bg-gray-800 cursor-pointer shadow-md transition-transform active:scale-95"
                    >
                        Upload Bill
                        <input
                            type="file"
                            className="hidden"
                            accept="image/*,.pdf"
                            onChange={handleUpload}
                        />
                    </label>

                    <div className="mt-8 pt-6 border-t border-gray-100 w-full">
                        <p className="text-sm text-gray-500 uppercase tracking-wider font-semibold mb-4">Or try a demo scenario</p>
                        <div className="flex flex-wrap justify-center gap-3">
                            <button 
                                onClick={() => handleDemo('mri')}
                                className="px-4 py-2 bg-blue-50 text-blue-700 rounded-md hover:bg-blue-100 border border-blue-200 font-medium"
                            >
                                Demo: MRI Brain
                            </button>
                            <button 
                                onClick={() => handleDemo('blood')}
                                className="px-4 py-2 bg-purple-50 text-purple-700 rounded-md hover:bg-purple-100 border border-purple-200 font-medium"
                            >
                                Demo: Blood Work
                            </button>
                            <button 
                                onClick={() => handleDemo('er')}
                                className="px-4 py-2 bg-orange-50 text-orange-700 rounded-md hover:bg-orange-100 border border-orange-200 font-medium"
                            >
                                Demo: ER Visit
                            </button>
                        </div>
                    </div>
                </div>

                {error && <p className="text-red-500 mt-4">{error}</p>}
              </>
            )}
          </div>
        )}

        {/* RESULTS */}
        {result && (
          <>
            {/* SUMMARY */}
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                    Overcharge Detected
                </h2>
                <span className="px-3 py-1 bg-red-100 text-red-700 font-bold rounded-full text-sm">
                    {result.overcharge_multiplier}x Markup
                </span>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <div>
                        <p className="text-sm text-gray-500 uppercase tracking-wide font-semibold">Procedure</p>
                        <p className="font-medium text-lg">{result.procedure}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 uppercase tracking-wide font-semibold">CPT Code</p>
                        <p className="font-mono bg-gray-100 px-2 py-1 rounded inline-block">{result.cpt}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 uppercase tracking-wide font-semibold">Hospital</p>
                        <p className="font-medium">{result.hospital}</p>
                    </div>
                  </div>

                  <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-end border-b border-gray-200 pb-2">
                        <span className="text-gray-600 font-medium">You were billed</span>
                        <span className="text-3xl font-bold text-red-600">${result.billed_amount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-end">
                        <span className="text-gray-600 font-medium">Fair price nearby</span>
                        <span className="text-3xl font-bold text-green-600">${result.fair_price.toLocaleString()}</span>
                    </div>
                  </div>
              </div>
            </div>

            {/* DETAILED AUDIT FINDINGS (New Section) */}
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    Detailed Audit Findings
                </h3>
                
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                        <p className="text-blue-800 font-semibold mb-1">Code Correctness</p>
                        <p className="text-sm text-blue-900 leading-relaxed">{result.code_audit}</p>
                    </div>
                    <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-100">
                        <p className="text-indigo-800 font-semibold mb-1">Rate Benchmarks</p>
                        <ul className="text-sm text-indigo-900 space-y-1">
                            <li className="flex justify-between"><span>Medicare Rate:</span> <span>${result.medicare_rate}</span></li>
                            <li className="flex justify-between"><span>Commercial Avg:</span> <span>${result.commercial_avg}</span></li>
                        </ul>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                        <p className="text-green-800 font-semibold mb-1">Confidence Score</p>
                        <div className="flex items-end gap-2">
                            <span className="text-3xl font-bold text-green-700">{result.confidence_score}%</span>
                            <span className="text-sm text-green-800 mb-1">High Certainty</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* PRICE COMPARISON */}
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Nearby Prices for the Same Procedure
              </h3>

              <ul className="space-y-3">
                {(result.cpt === '70553' ? PRICE_DATA : [
                    { hospital: result.hospital, price: result.billed_amount },
                    { hospital: 'Community Health', price: result.fair_price },
                    { hospital: 'Metro Imaging', price: Math.round(result.fair_price * 1.3) },
                    { hospital: 'University Med', price: Math.round(result.fair_price * 1.15) },
                ]).map((item) => (
                  <li
                    key={item.hospital}
                    className={`flex justify-between items-center p-4 rounded-lg border ${
                      item.price === result.billed_amount
                        ? 'bg-red-50 border-red-200 text-red-900'
                        : 'bg-white border-gray-100 hover:border-gray-300'
                    }`}
                  >
                    <span className="font-medium">{item.hospital}</span>
                    <span className={`font-bold ${item.price === result.billed_amount ? 'text-red-700' : 'text-gray-900'}`}>
                        ${item.price.toLocaleString()}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* AI EXPLANATION */}
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Why This Is Unfair
              </h3>

              <p className="text-gray-700 leading-relaxed text-lg">
                This procedure was billed at <strong className="text-red-600">{result.overcharge_multiplier}×</strong> the
                lowest negotiated rate available in your area.
                Multiple facilities offer the same procedure for under
                <strong className="text-green-600"> ${result.fair_price.toLocaleString()}</strong>, indicating this charge is significantly
                above the regional norm.
              </p>
            </div>

            {/* DISPUTE EMAIL */}
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Ready-to-Send Dispute Email
              </h3>

              <pre className="whitespace-pre-wrap text-sm bg-gray-50 p-6 rounded-lg border border-gray-200 font-mono text-gray-800 leading-relaxed">
{`Subject: Request for Billing Review – CPT ${result.cpt}

Hello Billing Department,

I am requesting a review of my charge for ${result.procedure} (CPT ${result.cpt}).

I was billed $${result.billed_amount.toLocaleString()} for this procedure. However, multiple nearby facilities
offer the same service for $${result.fair_price.toLocaleString()}. This charge appears to be ${result.overcharge_multiplier}× higher than
the regional negotiated rate.

Please review this bill, reprocess it at the appropriate rate, and provide
written confirmation.

Thank you,
[Patient Name]`}
              </pre>
            </div>

            {/* RESET */}
            <button
              onClick={() => setResult(null)}
              className="text-gray-500 hover:text-gray-900 underline font-medium block mx-auto"
            >
              Audit another bill
            </button>
          </>
        )}
      </div>
    </main>
  );
}
