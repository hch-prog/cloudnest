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
      <label className="inline-flex relative items-center border-white/10 bg-gradient-to-r from-blue-500/10 hover:from-blue-500/20 to-purple-500/10 hover:to-purple-500/20 hover:shadow-lg hover:shadow-blue-500/10 backdrop-blur-sm px-6 py-3 border hover:border-blue-500/50 rounded-xl font-medium text-white transition-all hover:translate-y-[-2px] duration-300 cursor-pointer"
      >
        {isUploading ? (
          <>
            <div className="border-2 mr-2 border-t-transparent border-blue-400 rounded-full w-5 h-5 animate-spin" />
            Uploading...
          </>
        ) : (
          <>
            <Upload className="mr-2 w-5 h-5 text-blue-400" />
            Upload File
          </>
        )}
        <input
          type="file"
          className="hidden"
          onChange={handleFileChange}
          disabled={isUploading}
        />
      </label>
      {uploadError && (
        <div className="top-full left-0 absolute bg-red-500/10 backdrop-blur-sm mt-3 p-4 border border-red-500/20 rounded-xl animate-slideDown"
        >
          <div className="flex items-center text-red-400 text-sm">
            <AlertTriangle className="flex-shrink-0 mr-2 w-4 h-4" />
            <span className="mr-2">{uploadError}</span>
            <button
              onClick={() => setUploadError(null)}
              className="hover:bg-red-500/20 ml-auto p-1.5 rounded-full transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}