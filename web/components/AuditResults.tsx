"use client";

import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import { ProcedureData } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";
import { PriceChart } from "./PriceChart";
import { AdvocateAgent } from "./AdvocateAgent";

interface AuditResultsProps {
  data: ProcedureData;
}

export function AuditResults({ data }: AuditResultsProps) {
  const overchargeMultiple = (data.userPrice / data.fairPrice).toFixed(1);

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* Header Result Card */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
      >
        <div className="p-6 border-b border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{data.name}</h2>
              <p className="text-gray-500 text-sm mt-1">CPT Code: {data.code}</p>
            </div>
            <div className="bg-red-50 text-red-600 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1 border border-red-100">
              <AlertTriangle size={16} />
              {overchargeMultiple}x Overcharge
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-8">
            <div>
              <p className="text-sm text-gray-500 uppercase tracking-wider font-medium">Billed Amount</p>
              <p className="text-4xl font-bold text-red-500 mt-1">{formatCurrency(data.userPrice)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 uppercase tracking-wider font-medium">Fair Price Nearby</p>
              <p className="text-4xl font-bold text-green-600 mt-1">{formatCurrency(data.fairPrice)}</p>
            </div>
          </div>
        </div>

        <div className="p-6 bg-gray-50/50">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Price Comparison</h3>
          <PriceChart data={data.comparison} />
        </div>
      </motion.div>

      {/* AI Advocate Section */}
      <AdvocateAgent data={data} />
    </div>
  );
}
