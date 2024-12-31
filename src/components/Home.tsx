'use client'

import { useState, useEffect } from 'react'
import { Folder, ChevronRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import FileUpload from '@/components/FileUpload'
import CreateFolder from '@/components/CreateFolder'
import { useSession } from 'next-auth/react'
import { FileCard } from './FileCard'

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

export default function Home() {
  const { data: session, status } = useSession()
  const [currentFolder, setCurrentFolder] = useState<string | null>(null)
  const [folders, setFolders] = useState<Folder[]>([])
  const [files, setFiles] = useState<File[]>([])
  const [breadcrumbs, setBreadcrumbs] = useState<Array<{ id: string, name: string }>>([])
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
        <div className="border-t-2 border-b-2 border-blue-500 rounded-full w-12 h-12 animate-spin"></div>
      </div>
    )
  }

  if (status === "unauthenticated") {
    router.push('/auth/signin')
    return null
  }

  return (
    <div className="bg-black/95 backdrop-blur-xl p-6 rounded-xl min-h-screen text-white">


      <div className="flex items-center space-x-2 mb-6 text-sm">
        <button
          onClick={() => setCurrentFolder(null)}
          className="text-blue-400 hover:text-blue-300 transition-colors"
        >
          Home
        </button>
        {breadcrumbs.map((crumb) => (
          <div key={crumb.id} className="flex items-center">
            <ChevronRight className="mx-2 w-4 h-4 text-gray-500" />
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
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 opacity-30 group-hover:opacity-100 blur rounded-lg transition duration-500"></div>
          <FileUpload
            onUploadComplete={handleRefresh}
            currentFolderId={currentFolder}
          />
        </div>
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 opacity-30 group-hover:opacity-100 blur rounded-lg transition duration-500"></div>
          <CreateFolder
            onFolderCreated={handleRefresh}
            currentFolderId={currentFolder}
          />
        </div>
      </div>

      {folders.length === 0 && files.length === 0 && (
        <div className="border-white/10 bg-white/5 py-16 border rounded-2xl text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-500/10 p-4 rounded-full">
              <Folder className="w-8 h-8 text-blue-400" />
            </div>
          </div>
          <p className="mb-4 text-gray-400">No files or folders yet</p>
          <p className="text-gray-500 text-sm">Upload files or create folders to get started</p>
        </div>
      )}

      <div className="gap-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {folders.map((folder) => (
          <FileCard
            key={folder.id}
            file={{
              id: folder.id,
              name: folder.name,
              type: "folder",
              createdAt: folder.createdAt
            }}
            onClick={() => handleFolderClick(folder.id)}
          />
        ))}

        {files.map((file) => (
          <FileCard
            key={file.id}
            file={{
              id: file.id,
              name: file.name,
              type: "document",
              size: file.size,
              createdAt: file.createdAt
            }}
            onClick={() => handleFileClick(file)}
            isLoading={loadingFileId === file.id}
          />
        ))}
      </div>
    </div>
  )
}