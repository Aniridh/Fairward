"use client";

import { motion } from "framer-motion";
import { Sparkles, Copy, Check } from "lucide-react";
import { useState } from "react";
import { ProcedureData } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";

interface AdvocateAgentProps {
  data: ProcedureData;
}

export function AdvocateAgent({ data }: AdvocateAgentProps) {
  const [copied, setCopied] = useState(false);

  const emailBody = `To Billing Department,

I am writing to dispute the charge of ${formatCurrency(data.userPrice)} for CPT Code ${data.code} (${data.name}).

A review of regional negotiated rates indicates the fair market price for this procedure is approximately ${formatCurrency(data.fairPrice)}. The billed amount is ${(data.userPrice / data.fairPrice).toFixed(1)}x higher than the local average.

Please review this charge and adjust it to the fair market rate of ${formatCurrency(data.fairPrice)}.

Sincerely,
[Patient Name]`;

  const handleCopy = () => {
    navigator.clipboard.writeText(emailBody);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="mt-8 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-100"
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 bg-indigo-600 rounded-lg text-white">
          <Sparkles size={20} />
        </div>
        <h3 className="text-lg font-semibold text-indigo-900">AI Advocate</h3>
      </div>

      <div className="bg-white rounded-xl p-4 shadow-sm border border-indigo-100">
        <p className="text-gray-600 mb-4 text-sm leading-relaxed">
          <span className="font-semibold text-indigo-600">Analysis:</span> This MRI was billed at <strong>{(data.userPrice / data.fairPrice).toFixed(1)}x</strong> the regional negotiated rate. I've drafted a dispute letter you can send immediately.
        </p>
        
        <div className="relative bg-gray-50 rounded-lg p-4 font-mono text-sm text-gray-700 whitespace-pre-wrap border border-gray-200">
          {emailBody}
          
          <button
            onClick={handleCopy}
            className="absolute top-2 right-2 p-2 hover:bg-gray-200 rounded-md transition-colors text-gray-500 hover:text-gray-700"
            title="Copy to clipboard"
          >
            {copied ? <Check size={16} className="text-green-600" /> : <Copy size={16} />}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
