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
        className="inline-flex relative items-center border-white/10 bg-white/5 hover:bg-white/10 backdrop-blur-sm px-6 py-3 border rounded-xl font-medium text-sm text-white transition-all duration-300"
      >
        <Folder className="mr-2 w-5 h-5" />
        New Folder
      </button>

      {isOpen && (
        <div className="z-50 fixed inset-0 flex justify-center items-center bg-black/50 backdrop-blur-sm">
          <div className="relative border-white/10 bg-black/95 shadow-2xl p-6 border rounded-2xl w-full max-w-sm">
            {/* Close button */}
            <button
              onClick={() => setIsOpen(false)}
              className="top-4 right-4 absolute hover:bg-white/10 p-1 rounded-full text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            
            <h3 className="mb-6 font-medium text-white text-xl">Create New Folder</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={folderName}
                onChange={(e) => setFolderName(e.target.value)}
                className="border-white/10 bg-white/5 px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500/50 w-full text-white focus:outline-none placeholder-gray-400"
                placeholder="Enter folder name"
                autoFocus
              />
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="border-white/10 bg-white/5 hover:bg-white/10 px-6 py-3 border rounded-xl font-medium text-gray-400 text-sm hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-blue-500 hover:from-blue-600 to-blue-600 hover:to-blue-700 px-6 py-3 rounded-xl font-medium text-sm text-white transition-colors"
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