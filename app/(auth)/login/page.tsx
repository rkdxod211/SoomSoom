'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { CharacterAvatar } from '@/components/character/character-avatar'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim() || !password.trim() || loading) return

    if (isSignUp && password !== confirmPassword) {
      setError('비밀번호가 일치하지 않아요')
      return
    }

    setLoading(true)
    setError('')
    const supabase = createClient()

    if (isSignUp) {
      const { error } = await supabase.auth.signUp({ email, password })
      if (error) { setError(error.message); setLoading(false); return }
      router.push('/onboarding')
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) { setError('이메일 또는 비밀번호가 틀렸어요'); setLoading(false); return }
      router.push('/feed')
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6" style={{ background: '#FFFDF8' }}>
      <div className="max-w-sm w-full flex flex-col items-center gap-8">
        <CharacterAvatar type="ghost" color="lavender" size={80} />

        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#2F2B3A]">
            {isSignUp ? '숨숨 시작하기' : '다시 왔어요'}
          </h1>
          <p className="text-sm text-[#6B647A] mt-1">
            {isSignUp ? '가입하면 랜덤 캐릭터가 생겨요' : '캐릭터로 로그인해요'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일"
            required
            className="w-full rounded-2xl border border-[#E8E4FF] bg-white px-4 py-3 text-sm text-[#2F2B3A] placeholder:text-[#B0AABF] focus:outline-none focus:ring-2 focus:ring-[#CDBBFF]"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호 (6자 이상)"
            required
            minLength={6}
            className="w-full rounded-2xl border border-[#E8E4FF] bg-white px-4 py-3 text-sm text-[#2F2B3A] placeholder:text-[#B0AABF] focus:outline-none focus:ring-2 focus:ring-[#CDBBFF]"
          />
          {isSignUp && (
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="비밀번호 확인"
              required
              minLength={6}
              className="w-full rounded-2xl border border-[#E8E4FF] bg-white px-4 py-3 text-sm text-[#2F2B3A] placeholder:text-[#B0AABF] focus:outline-none focus:ring-2 focus:ring-[#CDBBFF]"
            />
          )}
          {error && <p className="text-xs text-red-400 text-center">{error}</p>}
          <Button type="submit" size="lg" className="w-full" disabled={loading}>
            {loading ? '잠깐만...' : isSignUp ? '가입하기' : '로그인'}
          </Button>
        </form>

        <button
          onClick={() => { setIsSignUp(!isSignUp); setError(''); setConfirmPassword('') }}
          className="text-sm text-[#9B8FC4] underline underline-offset-2 cursor-pointer"
        >
          {isSignUp ? '이미 계정이 있어요' : '처음이에요, 가입할게요'}
        </button>
      </div>
    </main>
  )
}
