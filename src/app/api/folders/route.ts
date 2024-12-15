import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { name, parentId } = await request.json()
    
    const folder = await prisma.folder.create({
      data: {
        name,
        userId: session.user.id,
        parentId: parentId || null,
      },
    })

    return NextResponse.json({ success: true, folder })
  } catch (error) {
    console.error('Error creating folder:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create folder' },
      { status: 500 }
    )
  }
} 