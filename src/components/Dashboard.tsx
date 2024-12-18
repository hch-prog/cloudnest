'use client'

import { useState, useEffect } from 'react'
import { Book, Folder, ChevronRight, Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import FileUpload from '@/components/FileUpload'
import CreateFolder from '@/components/CreateFolder'
import { useSession } from 'next-auth/react'

interface File {
  id: string
  name: string
  size: number
  createdAt: string
  key: string
}

interface Folder {
  id: string
  name: string
  createdAt: string
  parentId: string | null
  itemCount?: number
}

export default function Dashboard() {
  const { data: session, status } = useSession()
  const [currentFolder, setCurrentFolder] = useState<string | null>(null)
  const [folders, setFolders] = useState<Folder[]>([])
  const [files, setFiles] = useState<File[]>([])
  const [breadcrumbs, setBreadcrumbs] = useState<Array<{id: string, name: string}>>([])
  const [isLoading, setIsLoading] = useState(true)
  const [loadingFileId, setLoadingFileId] = useState<string | null>(null)
  const router = useRouter()

  const fetchContents = async (folderId: string | null) => {
    try {
      setIsLoading(true)
      const response = await fetch(`/api/contents?folderId=${folderId || ''}`)
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch contents')
      }

      setFolders(data.folders || [])
      setFiles(data.files || [])
      setBreadcrumbs(data.breadcrumbs || [])
    } catch (error) {
      console.error('Error fetching contents:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      fetchContents(currentFolder)
    }
  }, [currentFolder, session, status])

  const handleFolderClick = (folderId: string) => {
    setCurrentFolder(folderId)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const handleRefresh = () => {
    fetchContents(currentFolder)
  }

  const handleFileClick = async (file: File) => {
    try {
      setLoadingFileId(file.id);
      const response = await fetch(`/api/download?key=${file.key}`)
      if (!response.ok) {
        throw new Error('Failed to get download URL')
      }
      
      const { url } = await response.json()
      
      window.open(url, '_blank')
      
    
    } catch (error) {
      console.error('Error accessing file:', error)
    } finally {
      setLoadingFileId(null);
    }
  }

  if (status === "loading" || isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (status === "unauthenticated") {
    router.push('/auth/signin')
    return null
  }

  return (
    <div className="bg-black/95 min-h-screen text-white p-6 rounded-xl backdrop-blur-xl">
      <div className="mb-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Search files and folders..."
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white placeholder-gray-400"
          />
          <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        </div>
      </div>
      
      <div className="flex items-center space-x-2 mb-6 text-sm">
        <button 
          onClick={() => setCurrentFolder(null)}
          className="text-blue-400 hover:text-blue-300 transition-colors"
        >
          CloudNest
        </button>
        {breadcrumbs.map((crumb) => (
          <div key={crumb.id} className="flex items-center">
            <ChevronRight className="mx-2 h-4 w-4 text-gray-500" />
            <button 
              onClick={() => setCurrentFolder(crumb.id)}
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              {crumb.name}
            </button>
          </div>
        ))}
      </div>

      <div className="flex space-x-4 mb-8">
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-500"></div>
          <FileUpload 
            onUploadComplete={handleRefresh}
            currentFolderId={currentFolder}
          />
        </div>
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-500"></div>
          <CreateFolder 
            onFolderCreated={handleRefresh}
            currentFolderId={currentFolder}
          />
        </div>
      </div>

      {folders.length === 0 && files.length === 0 && (
        <div className="text-center py-16 bg-white/5 rounded-2xl border border-white/10">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-blue-500/10 rounded-full">
              <Folder className="h-8 w-8 text-blue-400" />
            </div>
          </div>
          <p className="text-gray-400 mb-4">No files or folders yet</p>
          <p className="text-sm text-gray-500">Upload files or create folders to get started</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {folders.map((folder) => (
          <div
            key={folder.id}
            onClick={() => handleFolderClick(folder.id)}
            className="group p-4 bg-white/5 rounded-xl border border-white/10 hover:border-blue-500/50 cursor-pointer transition-all duration-300 hover:translate-y-[-2px] backdrop-blur-sm"
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition-colors">
                <Folder className="h-6 w-6 text-blue-400" />
              </div>
              <div>
                <span className="text-sm font-medium text-white block group-hover:text-blue-400 transition-colors">{folder.name}</span>
                <div className="flex space-x-2 text-xs text-gray-400">
                  <span>{formatDate(folder.createdAt)}</span>
                  {folder.itemCount !== undefined && (
                    <>
                      <span>•</span>
                      <span>{folder.itemCount} items</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {files.map((file) => (
          <div
            key={file.id}
            onClick={() => handleFileClick(file)}
            className="group p-4 bg-white/5 rounded-xl border border-white/10 hover:border-blue-500/50 cursor-pointer transition-all duration-300 hover:translate-y-[-2px] backdrop-blur-sm relative"
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition-colors">
                {loadingFileId === file.id ? (
                  <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600" />
                ) : (
                  <Book className="h-6 w-6 text-blue-400" />
                )}
              </div>
              <div>
                <span className="text-sm font-medium text-white block group-hover:text-blue-400 transition-colors">{file.name}</span>
                <div className="flex space-x-2 text-xs text-gray-400">
                  <span>{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                  <span>•</span>
                  <span>{formatDate(file.createdAt)}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}