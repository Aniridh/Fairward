"use client";

import { motion } from "framer-motion";
import { Upload } from "lucide-react";
import { useCallback, useState } from "react";

interface UploadZoneProps {
  onUpload: (file: File) => void;
}

export function UploadZone({ onUpload }: UploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      onUpload(file);
    }
  }, [onUpload]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onUpload(file);
    }
  }, [onUpload]);

  return (
    <div className="w-full max-w-xl mx-auto mt-20">
      <input
        type="file"
        id="file-upload"
        className="hidden"
        accept="image/*,.pdf"
        onChange={handleFileSelect}
      />
      <label htmlFor="file-upload">
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`
            relative border-2 border-dashed rounded-3xl p-12 text-center cursor-pointer transition-colors
            ${isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-blue-400 hover:bg-gray-50"}
          `}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="p-4 bg-blue-100 rounded-full text-blue-600">
              <Upload size={32} />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">Upload your medical bill</h3>
              <p className="text-gray-500 mt-1">Drag & drop or click to scan</p>
            </div>
            <p className="text-xs text-gray-400 uppercase tracking-wider font-medium">
              Supports PDF, JPG, PNG
            </p>
          </div>
        </motion.div>
      </label>
    </div>
  );
}
