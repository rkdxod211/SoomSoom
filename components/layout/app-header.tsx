'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { User } from '@/types'
import { CharacterAvatar } from '@/components/character/character-avatar'
import { createClient } from '@/lib/supabase/client'

interface AppHeaderProps {
  user?: User | null
}

export function AppHeader({ user }: AppHeaderProps) {
  const [showLogout, setShowLogout] = useState(false)
  const router = useRouter()

  async function handleLogout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <>
      <header className="sticky top-0 z-50 bg-[#FFFDF8]/90 backdrop-blur-sm border-b border-[#F0EDFF]">
        <div className="max-w-md mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/feed" className="flex items-center gap-1.5">
            <svg width="28" height="28" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="ghostGrad" x1="32" y1="14" x2="32" y2="56" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#D8C4FF" />
                  <stop offset="100%" stopColor="#B89EF0" />
                </linearGradient>
              </defs>
              <path d="M14 36 Q14 16 32 16 Q50 16 50 36 L50 54 L44 50 L38 54 L32 50 L26 54 L20 50 L14 54 Z"
                fill="url(#ghostGrad)" stroke="#2F2B3A" strokeWidth="2.5" strokeLinejoin="round" />
              <ellipse cx="25.5" cy="35" rx="3.5" ry="4.5" fill="#2F2B3A" />
              <ellipse cx="38.5" cy="35" rx="3.5" ry="4.5" fill="#2F2B3A" />
            </svg>
            <span className="text-[22px] font-black text-[#2F2B3A] tracking-tight leading-none" style={{ fontFamily: 'inherit' }}>
              soomsoom
            </span>
          </Link>
          {user && (
            <button onClick={() => setShowLogout(true)}>
              <CharacterAvatar
                type={user.character_type}
                color={user.character_color}
                size={32}
                className="cursor-pointer hover:scale-110 transition-transform"
              />
            </button>
          )}
        </div>
      </header>

      {showLogout && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
          onClick={() => setShowLogout(false)}
        >
          <div
            className="bg-white rounded-3xl p-6 mx-6 w-full max-w-xs shadow-xl flex flex-col gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-center text-[#2F2B3A] font-semibold">로그아웃 할까요?</p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowLogout(false)}
                className="flex-1 py-2.5 rounded-2xl text-sm font-medium bg-[#F5F3FF] text-[#6B647A]"
              >
                취소
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 py-2.5 rounded-2xl text-sm font-medium bg-[#7C6FCD] text-white"
              >
                로그아웃
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
