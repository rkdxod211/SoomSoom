'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { AppHeader } from '@/components/layout/app-header'
import { BottomNav } from '@/components/layout/bottom-nav'
import { CharacterCardPanel } from '@/components/character/character-card-panel'
import { PostCard } from '@/components/post/post-card'
import { User, CharacterCard, Post } from '@/types'

export default function MePage() {
  const [profile, setProfile] = useState<User | null>(null)
  const [card, setCard] = useState<CharacterCard | null>(null)
  const [posts, setPosts] = useState<Post[]>([])
  const [postCount, setPostCount] = useState(0)
  const [generating, setGenerating] = useState(false)
  const [justGenerated, setJustGenerated] = useState(false)
  const [loading, setLoading] = useState(true)
  const cardRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    async function load() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/login'); return }

      const meRes = await fetch('/api/me')
      if (!meRes.ok) { router.push('/login'); return }
      const { profile, card, post_count } = await meRes.json()
      setProfile(profile)
      setCard(card)
      setPostCount(post_count)

      const postsRes = await fetch(`/api/posts?user_id=${user.id}`)
      if (postsRes.ok) {
        const { posts } = await postsRes.json()
        setPosts(posts.filter((p: any) => p.user_id === user.id).slice(0, 5))
      }

      setLoading(false)
    }
    load()
  }, [router])

  async function handleGenerateCard() {
    setGenerating(true)
    const res = await fetch('/api/character-card/generate', { method: 'POST' })
    const data = await res.json()
    if (res.ok) {
      setCard(data)
      setJustGenerated(true)
      setTimeout(() => {
        cardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 100)
      setTimeout(() => setJustGenerated(false), 2500)
    } else {
      alert(`카드 생성 실패: ${data.error}`)
    }
    setGenerating(false)
  }

  if (loading || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#FFFDF8' }}>
        <p className="text-sm text-[#B0AABF]">불러오는 중...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#FFFDF8' }}>
      <AppHeader user={profile} />

      <main className="flex-1 max-w-md mx-auto w-full px-4 pt-4 pb-24 flex flex-col gap-4">
        <div ref={cardRef}>
          <CharacterCardPanel
            type={profile.character_type}
            color={profile.character_color}
            name={profile.character_name}
            card={card}
            postCount={postCount}
            isMe
            onGenerateCard={handleGenerateCard}
            generating={generating}
            justGenerated={justGenerated}
          />
        </div>

        {posts.length > 0 && (
          <div className="flex flex-col gap-3">
            <h2 className="text-xs font-semibold text-[#9B8FC4] uppercase tracking-wider">최근 글</h2>
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  )
}
