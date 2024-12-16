'use client'

import { useState, useEffect } from 'react'
import { Book, Folder } from 'lucide-react'
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
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (status === "unauthenticated") {
    router.push('/auth/signin')
    return null
  }

  return (
    <div>
      
      <div className="flex items-center space-x-2 mb-4 text-sm">
        <button 
          onClick={() => setCurrentFolder(null)}
          className="text-gray-600 hover:text-gray-900"
        >
          CloudNest
        </button>
        {breadcrumbs.map((crumb) => (
          <div key={crumb.id} className="flex items-center">
            <span className="mx-2 text-gray-400">/</span>
            <button 
              onClick={() => setCurrentFolder(crumb.id)}
              className="text-gray-600 hover:text-gray-900"
            >
              {crumb.name}
            </button>
          </div>
        ))}
      </div>

      
      <div className="flex space-x-4 mb-6">
        <FileUpload 
          onUploadComplete={handleRefresh}
          currentFolderId={currentFolder}
        />
        <CreateFolder 
          onFolderCreated={handleRefresh}
          currentFolderId={currentFolder}
        />
      </div>

     
      {folders.length === 0 && files.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No files or folders yet</p>
        </div>
      )}

      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {folders.map((folder) => (
          <div
            key={folder.id}
            onClick={() => handleFolderClick(folder.id)}
            className="p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-500 cursor-pointer"
          >
            <div className="flex items-center space-x-3">
              <Folder className="h-6 w-6 text-gray-400" />
              <div>
                <span className="text-sm font-medium text-gray-900 block">{folder.name}</span>
                <div className="flex space-x-2 text-xs text-gray-500">
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
            className="p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-500 cursor-pointer relative"
          >
            <div className="flex items-center space-x-3">
              {loadingFileId === file.id ? (
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600" />
              ) : (
                <Book className="h-6 w-6 text-gray-400" />
              )}
              <div>
                <span className="text-sm font-medium text-gray-900 block">{file.name}</span>
                <div className="flex space-x-2 text-xs text-gray-500">
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