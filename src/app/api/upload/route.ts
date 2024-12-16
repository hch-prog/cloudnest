import { NextRequest, NextResponse } from 'next/server'
import { PutObjectCommand } from '@aws-sdk/client-s3'
import { r2Client } from '@/lib/r2'
import { prisma } from '@/lib/db'
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get('file') as File | null
    const folderId = formData.get('folderId') as string | null
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    
    const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ 
        error: `File too large. Max size is ${MAX_FILE_SIZE / 1024 / 1024}MB` 
      }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    
    const key = `${Date.now()}-${file.name}`


    console.log('Uploading file:', {
      fileName: file.name,
      fileSize: buffer.length,
      fileType: file.type,
      folderId: folderId
    });

    try {
      await r2Client.send(new PutObjectCommand({
        Bucket: process.env.CLOUDFLARE_R2_BUCKET,
        Key: key,
        Body: buffer,
        ContentType: file.type,
      }))
    } catch (s3Error) {
      console.error('S3 Upload Error:', s3Error);
      return NextResponse.json(
        { error: 'Failed to upload to storage', details: String(s3Error) },
        { status: 500 }
      )
    }
    
    let fileRecord;
    try {
      fileRecord = await prisma.file.create({
        data: {
          name: file.name,
          key: key,
          size: buffer.length,
          userId: session.user.id,
          folderId: folderId || undefined,
        },
      })
    } catch (dbError) {
      console.error('Database Create Error:', dbError);
      return NextResponse.json(
        { error: 'Failed to create file record', details: String(dbError) },
        { status: 500 }
      )
    }
    
    return NextResponse.json({ success: true, file: fileRecord })
  } catch (error) {
    console.error('Unexpected Upload Error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Upload failed', 
        details: String(error) 
      },
      { status: 500 }
    )
  }
}