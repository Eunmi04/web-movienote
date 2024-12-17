'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { FaHeart } from 'react-icons/fa'

interface LikeButtonProps {
  movieId: string
}

export default function LikeButton({ movieId }: LikeButtonProps) {
  const { data: session } = useSession()
  const [isLiked, setIsLiked] = useState(false)

  // 찜 상태 확인
  useEffect(() => {
    const checkLikeStatus = async () => {
      if (!session?.user?.name) return
      
      try {
        const response = await fetch(`/api/likes?movieId=${movieId}&userName=${session.user.name}`)
        if (!response.ok) throw new Error('찜 상태 확인 실패')
        const data = await response.json()
        setIsLiked(data.isLiked)
      } catch (error) {
        console.error('찜 상태 확인 중 오류:', error)
      }
    }

    checkLikeStatus()
  }, [movieId, session?.user?.name])

  // 찜하기/취소 처리
  const handleLike = async () => {
    if (!session?.user?.name) {
      alert('로그인이 필요합니다.')
      return
    }

    try {
      const response = await fetch('/api/likes', {
        method: isLiked ? 'DELETE' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          movieId,
          userName: session.user.name,
        }),
      })

      if (!response.ok) throw new Error('찜하기 처리 실패')
      
      const data = await response.json();
      if (data.error) {
        alert(data.error); // 서버에서 발생한 에러 메시지 표시
      } else {
        setIsLiked(!isLiked);
      }
    } catch (error) {
      console.error('찜하기 처리 중 오류:', error)
      alert('찜하기 처리 중 오류가 발생했습니다. 다시 시도해 주세요.'); // 사용자에게 알림 추가
    }
  }

  return (
    <button
      onClick={handleLike}
      className="ml-2 focus:outline-none"
      aria-label={isLiked ? "찜하기 취소" : "찜하기"}
    >
      <FaHeart 
        className={`text-2xl transition-colors ${
          isLiked ? 'text-pink-500' : 'text-gray-300'
        }`}
      />
    </button>
  )
}
