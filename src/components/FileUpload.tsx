'use client'

import { useState } from 'react'
import { Upload, AlertTriangle, X } from 'lucide-react'

interface FileUploadProps {
  onUploadComplete?: () => void
  currentFolderId?: string | null
}

export default function FileUpload({ onUploadComplete, currentFolderId }: FileUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    
    const MAX_FILE_SIZE = 10 * 1024 * 1024; 
    const ALLOWED_TYPES = [
      'image/jpeg', 'image/png', 'image/gif', 
      'application/pdf', 'text/plain', 
      'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];

    if (!ALLOWED_TYPES.includes(file.type)) {
      setUploadError('Unsupported file type');
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setUploadError(`File too large. Max size is ${MAX_FILE_SIZE / 1024 / 1024}MB`);
      return;
    }

    try {
      setIsUploading(true)
      setUploadError(null)  

      const formData = new FormData()
      formData.append('file', file)
      if (currentFolderId) {
        formData.append('folderId', currentFolderId)
      }

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      const result = await response.json()

      if (!response.ok) {
        
        throw new Error(result.error || result.details || 'Upload failed')
      }

     
      if (e.target) e.target.value = ''

      
      onUploadComplete?.()
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error)
      
      setUploadError(errorMessage)
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="relative">
      <label className="relative inline-flex items-center px-6 py-3 text-sm font-medium rounded-xl text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300 cursor-pointer backdrop-blur-sm">
        <Upload className="h-5 w-5 mr-2" />
        {isUploading ? 'Uploading...' : 'Upload File'}
        <input
          type="file"
          className="hidden"
          onChange={handleFileChange}
          disabled={isUploading}
        />
      </label>
      {uploadError && (
        <div className="absolute top-full left-0 mt-2 p-3 bg-red-500/10 border border-red-500/20 rounded-xl backdrop-blur-sm">
          <div className="flex items-center text-red-400 text-sm">
            <AlertTriangle className="h-4 w-4 mr-2" />
            {uploadError}
            <button 
              onClick={() => setUploadError(null)}
              className="ml-2 p-1 hover:bg-red-500/20 rounded-full transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}