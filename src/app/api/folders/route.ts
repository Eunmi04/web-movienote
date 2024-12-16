import { NextResponse } from 'next/server'
import connectMongoDB from '@/libs/mongodb'
import Folder from '@/models/folder'

export async function GET() {
  try {
    await connectMongoDB()
    const folders = await Folder.find()
    return NextResponse.json({ folders })
  } catch (error) {
    return NextResponse.json({ error: '폴더 목록을 가져오는데 실패했습니다' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { name } = await request.json()
    await connectMongoDB()
    const folder = await Folder.create({ name })
    return NextResponse.json({ folder })
  } catch (error) {
    return NextResponse.json({ error: '폴더 생성에 실패했습니다' }, { status: 500 })
  }
} 