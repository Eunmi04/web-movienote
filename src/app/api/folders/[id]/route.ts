import { NextResponse } from 'next/server'
import connectMongoDB from '@/libs/mongodb'
import Folder from '@/models/folder'

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params
    await connectMongoDB()
    await Folder.findByIdAndDelete(id)
    return NextResponse.json({ message: '폴더가 삭제되었습니다' })
  } catch (error) {
    return NextResponse.json({ error: '폴더 삭제에 실패했습니다' }, { status: 500 })
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params
    const { name } = await request.json()
    await connectMongoDB()
    const folder = await Folder.findByIdAndUpdate(id, { name }, { new: true })
    return NextResponse.json({ folder })
  } catch (error) {
    return NextResponse.json({ error: '폴더 수정에 실패했습니다' }, { status: 500 })
  }
} 