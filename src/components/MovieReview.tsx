// src/components/MovieReview.tsx
'use client'

import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { FaTrash } from 'react-icons/fa'

interface MovieReviewProps {
  movieId: string
}

interface Review {
  _id: string
  movieId: string
  content: string
  createdAt: string
  userName: string
  userImage?: string
}

export default function MovieReview({ movieId }: MovieReviewProps) {
  const { data: session } = useSession()
  const [review, setReview] = useState('')
  const [reviews, setReviews] = useState<Review[]>([])

  // 리뷰 삭제 처리
  const handleDelete = async (reviewId: string) => {
    if (!confirm('리뷰를 삭제하시겠습니까?')) return

    try {
      const response = await fetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE',
      })

      if (!response.ok) throw new Error('리뷰 삭제에 실패했습니다.')

      // 리뷰 목록 새로고침
      setReviews(reviews.filter(review => review._id !== reviewId))
    } catch (error) {
      console.error('리뷰 삭제 중 오류:', error)
    }
  }

  // 리뷰 목록 가져오기
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`/api/reviews?movieId=${movieId}`)
        if (!response.ok) throw new Error('리뷰 조회에 실패했습니다.')
        const data = await response.json()
        setReviews(data.reviews)
      } catch (error) {
        console.error('리뷰 조회 중 오류:', error)
      }
    }

    fetchReviews()
  }, [movieId])

  // 리뷰 제출 처리
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!session?.user?.name) {
      alert('로그인이 필요합니다.')
      return
    }
    
    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          movieId,
          content: review,
          userName: session.user.name,
          userImage: session.user.image
        }),
      })

      if (!response.ok) throw new Error('리뷰 작성에 실패했습니다.')

      setReview('')
      
      // 리뷰 목록 새로고침
      const updatedResponse = await fetch(`/api/reviews?movieId=${movieId}`)
      const updatedData = await updatedResponse.json()
      setReviews(updatedData.reviews)
      
    } catch (error) {
      console.error('리뷰 작성 중 오류 발생:', error)
    }
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">리뷰</h2>
      
      {/* 리뷰 작성 폼 */}
      <form onSubmit={handleSubmit} className="mb-6">
        <Textarea
          placeholder={session ? "이 영화에 대한 리뷰를 작성해주세요" : "리뷰를 작성하려면 로그인이 필요합니다"}
          value={review}
          onChange={(e) => setReview(e.target.value)}
          className="w-full p-4 border border-gray-300 rounded-lg mb-4 min-h-[150px]"
          disabled={!session}
        />
        <Button 
          type="submit"
          className="bg-[#2d5a27] hover:bg-[#234620] text-white px-6 py-2 rounded-lg"
          disabled={!session}
        >
          리뷰 작성
        </Button>
      </form>

      {/* 리뷰 목록 */}
      <div className="space-y-4">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review._id} className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <Image
                    src={review.userImage || '/default-avatar.png'}
                    alt={`${review.userName}의 프로필 이미지`}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <span className="font-semibold">{review.userName}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-gray-500 text-sm">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </span>
                  {session?.user?.name === review.userName && (
                    <button
                      onClick={() => handleDelete(review._id)}
                      className="text-red-500 hover:text-red-700"
                      aria-label="리뷰 삭제"
                    >
                      <FaTrash />
                    </button>
                  )}
                </div>
              </div>
              <p className="ml-12">{review.content}</p>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500">
            아직 작성된 리뷰가 없습니다.
          </div>
        )}
      </div>
    </div>
  )
}