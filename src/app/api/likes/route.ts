import { connectToDatabase } from "@/libs/mongodb"
import { NextResponse } from "next/server"

export async function DELETE(req: Request) {
    try {
      const { searchParams } = new URL(req.url)
      const movieId = searchParams.get('movieId')
      const userName = searchParams.get('userName')
  
      if (!movieId || !userName) {
        return NextResponse.json(
          { error: '필수 정보가 누락되었습니다.' },
          { status: 400 }
        )
      }
  
      const db = await connectToDatabase()
      const likesCollection = db.collection('likes')
  
      // 찜 해제 처리
      const result = await likesCollection.deleteOne({ movieId, userName })
      
      if (result.deletedCount === 0) {
        return NextResponse.json(
          { error: '찜 해제할 영화가 없습니다.' },
          { status: 404 }
        )
      }
  
      return NextResponse.json({ success: true })
    } catch (error) {
      console.error('찜하기 취소 중 오류:', error)
      return NextResponse.json(
        { error: '찜하기 취소에 실패했습니다.' },
        { status: 500 }
      )
    }
  }
  