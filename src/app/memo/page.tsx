import React from 'react'
import MemoList from '@/components/MemoList'
import { FiFilm, FiArrowLeft } from 'react-icons/fi'
import Link from 'next/link'

export default function MemoPage() {
  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <FiFilm className="w-8 h-8 text-green-600" />
            <h1 className="text-4xl font-bold text-green-600">
              영화 기록장 페이지
            </h1>
          </div>
          <Link
            href="/memo"
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            <FiArrowLeft className="w-5 h-5" />
            <span>뒤로가기</span>
          </Link>
        </div>

        <MemoList />
      </div>
    </div>
  )
}