'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { User } from '@/types'
import { CharacterAvatar } from '@/components/character/character-avatar'
import { Button } from '@/components/ui/button'

export default function OnboardingPage() {
  const [character, setCharacter] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    async function assignCharacter() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/login'); return }

      const res = await fetch('/api/onboarding/assign-character', { method: 'POST' })
      if (!res.ok) { router.push('/feed'); return }

      const data = await res.json()
      if (data.message === 'Already onboarded') {
        router.push('/feed')
        return
      }
      setCharacter(data)
      setLoading(false)
    }
    assignCharacter()
  }, [router])

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center" style={{ background: '#FFFDF8' }}>
        <div className="text-center flex flex-col items-center gap-4">
          <div className="animate-bounce">
            <CharacterAvatar type="slime" color="mint" size={64} />
          </div>
          <p className="text-sm text-[#6B647A]">캐릭터 뽑는 중...</p>
        </div>
      </main>
    )
  }

  if (!character) return null

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6" style={{ background: '#FFFDF8' }}>
      <div className="max-w-sm w-full flex flex-col items-center gap-8">
        <div className="text-center">
          <p className="text-sm text-[#6B647A] mb-4">당신의 캐릭터는...</p>
          <div className="inline-flex flex-col items-center gap-4 p-8 rounded-3xl" style={{ background: '#F0EDFF' }}>
            <div className="animate-bounce">
              <CharacterAvatar
                type={character.character_type}
                color={character.character_color}
                size={100}
              />
            </div>
            <div className="text-center">
              <h2 className="text-2xl font-bold text-[#2F2B3A]">{character.character_name}</h2>
              <p className="text-sm text-[#6B647A] mt-1">이제 이 캐릭터로 글을 올려요 ✨</p>
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col gap-3">
          <Button size="lg" className="w-full" onClick={() => router.push('/feed')}>
            이 캐릭터로 시작 →
          </Button>
          <p className="text-xs text-center text-[#B0AABF]">캐릭터는 바꿀 수 없어요</p>
        </div>
      </div>
    </main>
  )
}
