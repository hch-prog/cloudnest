'use client'

import { Folder, X } from 'lucide-react'
import { useState } from 'react'

interface CreateFolderProps {
  onFolderCreated?: () => void
  currentFolderId?: string | null
}

export default function CreateFolder({ onFolderCreated, currentFolderId }: CreateFolderProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [folderName, setFolderName] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const response = await fetch('/api/folders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          name: folderName,
          parentId: currentFolderId 
        }),
      })

      if (response.ok) {
        setFolderName('')
        setIsOpen(false)
        onFolderCreated?.()
      }
    } catch (error) {
      console.error('Error creating folder:', error)
    }
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="relative inline-flex items-center px-6 py-3 text-sm font-medium rounded-xl text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300 backdrop-blur-sm"
      >
        <Folder className="h-5 w-5 mr-2" />
        New Folder
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="relative bg-black/95 rounded-2xl p-6 max-w-sm w-full border border-white/10 shadow-2xl">
            {/* Close button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-1 text-gray-400 hover:text-white rounded-full hover:bg-white/10 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
            
            <h3 className="text-xl font-medium mb-6 text-white">Create New Folder</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={folderName}
                onChange={(e) => setFolderName(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white placeholder-gray-400"
                placeholder="Enter folder name"
                autoFocus
              />
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-6 py-3 text-sm font-medium text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-xl transition-colors"
                >
                  Create Folder
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}