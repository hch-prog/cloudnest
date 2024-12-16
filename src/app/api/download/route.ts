
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from '@/lib/db'
import { r2Client } from '@/lib/r2'
import { GetObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const key = searchParams.get('key')
    if (!key) {
      return NextResponse.json({ error: 'File key is required' }, { status: 400 })
    }

    const file = await prisma.file.findFirst({
      where: {
        key,
        userId: session.user.id
      }
    })

    if (!file) {
      return NextResponse.json({ error: 'File not found or access denied' }, { status: 404 })
    }

   
    const command = new GetObjectCommand({
      Bucket: process.env.CLOUDFLARE_R2_BUCKET,
      Key: key,
      ResponseContentDisposition: `inline; filename="${encodeURIComponent(file.name)}"`,
      ResponseCacheControl: 'no-store, no-cache, must-revalidate, max-age=0'
    })

    const urlExpirationSeconds = 60; 
    const signedUrl = await getSignedUrl(r2Client, command, { 
      expiresIn: urlExpirationSeconds
    })

    if (!signedUrl) {
      throw new Error('Failed to generate signed URL')
    }

    return NextResponse.json({ 
      url: signedUrl,
      expires: new Date(Date.now() + urlExpirationSeconds * 1000).toISOString()
    })
  } catch (error) {
    console.error('Error generating signed URL:', error)
    
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json(
      { 
        error: 'Failed to generate download URL',
        details: process.env.NODE_ENV === 'development' ? errorMessage : undefined
      },
      { status: 500 }
    )
  }
}