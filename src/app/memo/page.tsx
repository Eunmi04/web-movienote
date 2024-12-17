import React from 'react'
import MemoList from '@/components/MemoList'
import { FiFilm } from 'react-icons/fi'


export default function MemoPage() {
  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <FiFilm className="w-8 h-8 text-green-600" />
            <h1 className="text-4xl font-bold text-green-600">
              영화 기록장
            </h1>
          </div>
        </div>
        <MemoList />
      </div>
    </div>
  )
}