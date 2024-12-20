'use client'

import { useSession } from 'next-auth/react'
import { redirect, useRouter } from 'next/navigation'
import React, { useState } from 'react'
import BoardSidebar from '@/components/BoardSidebar'

export default function AddPostPage() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [category, setCategory] = useState('')
  const router = useRouter()
  const { data: session } = useSession()

  // 세션이 없으면 로그인 페이지로 리디렉션
  if (!session) {
    redirect('/login')
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!title || !content) {
      alert('Title and content are required')
      return
    }

    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content, author: session.user.name }),
      })

      const responseData = await res.json() // 응답 데이터 확인
      console.log('Response from POST:', responseData) // 응답 로그 추가

      if (res.ok) {
        router.push('/board')
        router.refresh()
      } else {
        throw new Error('Failed to create a post')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="flex">
      <BoardSidebar />
      <div className="container mx-auto px-4 py-24 flex-1">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">글쓰기</h1>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <input
              type="text"
              className="border border-slate-500 p-4"
              placeholder="게시글 제목"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              required
            />
            <textarea
              className="border border-slate-500 p-4 h-64"
              placeholder="게시글 내용"
              onChange={(e) => setContent(e.target.value)}
              value={content}
              required
            />
            <select
              className="border border-slate-500 p-4"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="" disabled>
                카테고리 선택
              </option>
              <option value="category1">카테고리 1</option>
              <option value="category2">카테고리 2</option>
              <option value="category3">카테고리 3</option>
            </select>
            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => router.push('/board')}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                취소
              </button>
              <button
                className="bg-blue-500 text-white font-bold px-6 py-3 w-fit rounded-md"
                type="submit"
              >
                등록
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
