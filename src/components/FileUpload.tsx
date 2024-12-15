'use client'

import { useState } from 'react'
import { Upload, AlertTriangle } from 'lucide-react'

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

    // File type and size validation
    const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
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
      setUploadError(null)  // Reset any previous errors

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
        // Use the error message from the server response
        throw new Error(result.error || result.details || 'Upload failed')
      }

      // Clear the input
      if (e.target) e.target.value = ''

      // Notify parent component about successful upload
      onUploadComplete?.()
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error)
      
      setUploadError(errorMessage)
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div>
      <label className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 cursor-pointer">
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
        <div className="text-red-500 mt-2 flex items-center">
          <AlertTriangle className="mr-2" />
          {uploadError}
        </div>
      )}
    </div>
  )
}