import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"

export async function GET(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions)
        
        if (!session?.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const { searchParams } = new URL(request.url)
        const folderId = searchParams.get('folderId')
        const userId = session.user.id

       
        const folders = await prisma.folder.findMany({
            where: {
                userId,
                parentId: folderId || null
            },
            select: {
                id: true,
                name: true,
                createdAt: true,
                _count: {
                    select: {
                        files: true,
                        subfolders: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        })

        
        const files = await prisma.file.findMany({
            where: {
                userId,
                folderId: folderId || null
            },
            select: {
                id: true,
                name: true,
                size: true,
                key: true,
                createdAt: true,
            },
            orderBy: {
                createdAt: 'desc'
            }
        })

       
        const breadcrumbs = []
        if (folderId) {
            let currentFolder = await prisma.folder.findUnique({
                where: { 
                    id: folderId,
                    userId 
                },
                select: {
                    id: true,
                    name: true,
                    parentId: true
                }
            })

            if (!currentFolder) {
                return NextResponse.json({ error: 'Folder not found' }, { status: 404 })
            }

            while (currentFolder) {
                breadcrumbs.unshift({
                    id: currentFolder.id,
                    name: currentFolder.name
                })

                if (currentFolder.parentId) {
                    currentFolder = await prisma.folder.findUnique({
                        where: { 
                            id: currentFolder.parentId,
                            userId 
                        },
                        select: {
                            id: true,
                            name: true,
                            parentId: true
                        }
                    })
                } else {
                    break
                }
            }
        }

        return NextResponse.json({
            folders: folders.map(folder => ({
                ...folder,
                itemCount: folder._count.files + folder._count.subfolders
            })),
            files,
            breadcrumbs
        })
    } catch (error) {
        console.error('Error fetching contents:', error)
        return NextResponse.json(
            { error: 'Failed to fetch contents' },
            { status: 500 }
        )
    }
} 