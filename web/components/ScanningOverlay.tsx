"use client";

import { motion } from "framer-motion";
import { Scan, Brain, Search, CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";

const STEPS = [
  { icon: Scan, text: "OCR Scanning Bill..." },
  { icon: Brain, text: "Identifying Procedures..." },
  { icon: Search, text: "Checking Regional Prices..." },
  { icon: CheckCircle, text: "Analysis Complete" }
];

export function ScanningOverlay() {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev < STEPS.length - 1 ? prev + 1 : prev));
    }, 800); // 800ms per step -> ~2.4s total

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-white/90 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
      <div className="w-full max-w-md space-y-8">
        {STEPS.map((step, index) => {
          const Icon = step.icon;
          const isActive = index === currentStep;
          const isCompleted = index < currentStep;

          return (
            <motion.div
              key={step.text}
              initial={{ opacity: 0, x: -20 }}
              animate={{ 
                opacity: index <= currentStep ? 1 : 0.3,
                x: 0,
                scale: isActive ? 1.05 : 1
              }}
              className={`flex items-center space-x-4 p-4 rounded-xl ${
                isActive ? "bg-blue-50 border border-blue-100 shadow-sm" : ""
              }`}
            >
              <div className={`
                p-2 rounded-full 
                ${isCompleted ? "bg-green-100 text-green-600" : isActive ? "bg-blue-100 text-blue-600 animate-pulse" : "bg-gray-100 text-gray-400"}
              `}>
                <Icon size={24} />
              </div>
              <span className={`font-medium ${isActive ? "text-blue-900" : "text-gray-500"}`}>
                {step.text}
              </span>
              {isCompleted && (
                <motion.div 
                  initial={{ scale: 0 }} 
                  animate={{ scale: 1 }}
                  className="ml-auto text-green-500"
                >
                  <CheckCircle size={20} />
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
