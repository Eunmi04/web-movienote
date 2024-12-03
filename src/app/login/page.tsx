import SigninButton from '@/components/SigninButton'
import Link from 'next/link'
import React from 'react'

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen pt-20">
      <div className="w-full max-w-sm shadow-2xl drop-shadow-2xl rounded-lg p-8 border-t border-gray-300">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          로그인
        </h2>
        <form className="space-y-4">
          {/*이메일 입력 */}
          <div>
            <label
              htmlFor="st_name"
              className="block text-sm font-medium text-gray-700"
            >
              이메일
            </label>
            <input
              type="text"
              name="st_email"
              id="st_email"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="이메일"
            />
          </div>
          {/* 비밀번호 입력 */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              비밀번호
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="비밀번호"
            />
          </div>
          {/* 로그인 버튼 */}
          <button
            type="submit"
            className="w-full bg-green-700 text-white py-2 px-4 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            로그인
          </button>
        </form>
        {/* 회원가입 링크 */}
        <div className=" text-right pt-1">
          <Link href="/signup" className="text-sm font-medium text-gray-700 ">
            회원가입
          </Link>
        </div>

        <div className="justify-center mr-3">
          <SigninButton />
        </div>
      </div>
    </div>
  )
}
