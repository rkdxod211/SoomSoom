'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { CharacterAvatar } from '@/components/character/character-avatar'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim() || loading) return
    setLoading(true)

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/onboarding` },
    })

    setLoading(false)
    if (!error) setSent(true)
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6" style={{ background: '#FFFDF8' }}>
      <div className="max-w-sm w-full flex flex-col items-center gap-8">
        <CharacterAvatar type="ghost" color="lavender" size={80} />

        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#2F2B3A]">숨숨 시작하기</h1>
          <p className="text-sm text-[#6B647A] mt-1">이메일로 로그인 링크를 받아요</p>
        </div>

        {sent ? (
          <div className="w-full bg-[#F0EDFF] rounded-3xl p-6 text-center">
            <p className="text-sm font-semibold text-[#2F2B3A]">링크를 보냈어요 ✨</p>
            <p className="text-xs text-[#6B647A] mt-1">{email}을 확인해봐</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="이메일 주소"
              required
              className="w-full rounded-2xl border border-[#E8E4FF] bg-white px-4 py-3 text-sm text-[#2F2B3A] placeholder:text-[#B0AABF] focus:outline-none focus:ring-2 focus:ring-[#CDBBFF]"
            />
            <Button type="submit" size="lg" className="w-full" disabled={loading}>
              {loading ? '보내는 중...' : '로그인 링크 받기'}
            </Button>
          </form>
        )}

        <p className="text-xs text-[#B0AABF] text-center">
          비밀번호 없이 이메일 링크 하나로 로그인해요
        </p>
      </div>
    </main>
  )
}
