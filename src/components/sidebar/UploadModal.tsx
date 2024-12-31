"use client";
import { ModalProps } from "@/types/sidebar";
import { useRef, useCallback, useState } from "react";


export const UploadModal = ({ isOpen, onClose }: ModalProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    // Handle file drop here
    const files = Array.from(e.dataTransfer.files);
    console.log('Dropped files:', files);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="z-50 fixed inset-0">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="top-1/2 left-1/2 absolute w-full max-w-md -translate-x-1/2 -translate-y-1/2">
        <div className="border-white/10 bg-[#1a1a1a] shadow-2xl border rounded-xl">
          {/* Header */}
          <div className="flex justify-between items-center border-white/10 p-6 border-b">
            <h3 className="font-semibold text-white text-xl">Create New</h3>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="space-y-4 p-6">
            {/* Upload File Option */}
            <div
              className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer
                ${isDragging 
                  ? 'border-blue-500 bg-blue-500/10' 
                  : 'border-white/10 hover:border-blue-500/50 hover:bg-white/5'
                }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <input 
                type="file" 
                ref={fileInputRef}
                className="hidden" 
                multiple
                onChange={(e) => console.log('Selected files:', e.target.files)}
              />
              <div className="flex flex-col items-center gap-2">
                <svg className="w-10 h-10 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <div className="font-medium text-white">
                  Drop files here or <span className="text-blue-500">browse</span>
                </div>
                <p className="text-gray-400 text-sm">
                  Upload any file up to 50MB
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="border-white/10 border-t w-full"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-[#1a1a1a] px-2 text-gray-400">or</span>
              </div>
            </div>

            {/* Create Folder Option */}
            <button 
              className="border-white/10 hover:bg-white/5 p-4 border hover:border-blue-500/50 rounded-xl w-full transition-colors group"
              onClick={() => {
                // Handle create folder
                console.log('Create folder clicked');
              }}
            >
              <div className="flex justify-center items-center gap-3">
                <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                </svg>
                <span className="font-medium text-white">Create New Folder</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}; 