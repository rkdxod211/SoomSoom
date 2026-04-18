'use client'

import { useState } from 'react'
import { AppHeader } from '@/components/layout/app-header'
import { BottomNav } from '@/components/layout/bottom-nav'
import { CharacterAvatar } from '@/components/character/character-avatar'
import { FollowButton } from '@/components/character/follow-button'
import { CATEGORIES } from '@/lib/character/categories'
import { CHARACTER_COLOR_HEX } from '@/types'
import Link from 'next/link'

export default function SearchPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  async function handleCategorySelect(categoryId: string) {
    if (selectedCategory === categoryId) {
      setSelectedCategory(null)
      setResults([])
      return
    }
    setSelectedCategory(categoryId)
    setLoading(true)
    const res = await fetch(`/api/search?category=${categoryId}`)
    if (res.ok) {
      const { users } = await res.json()
      setResults(users)
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#FFFDF8' }}>
      <AppHeader />

      <main className="flex-1 max-w-md mx-auto w-full px-4 pt-4 pb-24 flex flex-col gap-4">
        <h1 className="text-base font-bold text-[#2F2B3A]">태그로 찾기</h1>

        {/* Category grid */}
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategorySelect(cat.id)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#CDBBFF] text-[#2F2B3A] shadow-sm scale-105'
                  : 'bg-[#F0EDFF] text-[#6B647A] hover:bg-[#E8E4FF]'
              }`}
            >
              {cat.emoji} {cat.label}
            </button>
          ))}
        </div>

        {/* Results */}
        {loading && (
          <p className="text-sm text-[#B0AABF] text-center py-8">찾는 중...</p>
        )}

        {!loading && selectedCategory && results.length === 0 && (
          <p className="text-sm text-[#B0AABF] text-center py-8">
            아직 이 태그에 속한 캐릭터가 없어요
          </p>
        )}

        {!loading && results.length > 0 && (
          <div className="flex flex-col gap-3">
            <p className="text-xs text-[#9B8FC4] font-semibold uppercase tracking-wider">
              {results.length}명의 캐릭터
            </p>
            {results.map((u) => (
              <div
                key={u.id}
                className="bg-white rounded-3xl p-4 flex items-center gap-3 shadow-[0_2px_16px_rgba(0,0,0,0.06)]"
              >
                <Link href={`/character/${u.id}`}>
                  <CharacterAvatar type={u.character_type} color={u.character_color} size={40} />
                </Link>
                <div className="flex-1 min-w-0">
                  <Link href={`/character/${u.id}`}>
                    <p className="text-sm font-semibold text-[#2F2B3A]">{u.character_name}</p>
                  </Link>
                  <div className="flex gap-2 text-xs text-[#B0AABF] mt-0.5">
                    <span>팔로워 {u.follower_count}</span>
                    <span>·</span>
                    <div className="flex gap-1 flex-wrap">
                      {(u.categories ?? []).map((cid: string) => {
                        const cat = CATEGORIES.find((c) => c.id === cid)
                        return cat ? (
                          <span key={cid}>{cat.emoji}{cat.label}</span>
                        ) : null
                      })}
                    </div>
                  </div>
                </div>
                <FollowButton userId={u.id} initialFollowing={u.is_following} />
              </div>
            ))}
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  )
}
