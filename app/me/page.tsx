'use client'

import { useEffect, useRef, useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { AppHeader } from '@/components/layout/app-header'
import { BottomNav } from '@/components/layout/bottom-nav'
import { CharacterCardPanel } from '@/components/character/character-card-panel'
import { PostCard } from '@/components/post/post-card'
import { User, CharacterCard, Post } from '@/types'
import { CATEGORIES, CATEGORY_KEYWORDS, CategoryId } from '@/lib/character/categories'

type SortMode = 'latest' | 'reactions' | 'category'

export default function MePage() {
  const [profile, setProfile] = useState<User | null>(null)
  const [card, setCard] = useState<CharacterCard | null>(null)
  const [posts, setPosts] = useState<Post[]>([])
  const [postCount, setPostCount] = useState(0)
  const [followerCount, setFollowerCount] = useState(0)
  const [followingCount, setFollowingCount] = useState(0)
  const [generating, setGenerating] = useState(false)
  const [justGenerated, setJustGenerated] = useState(false)
  const [loading, setLoading] = useState(true)
  const [sortMode, setSortMode] = useState<SortMode>('latest')
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | null>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    async function load() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/login'); return }

      const meRes = await fetch('/api/me')
      if (!meRes.ok) { router.push('/login'); return }
      const { profile, card, post_count, follower_count, following_count } = await meRes.json()
      setProfile(profile)
      setCard(card)
      setPostCount(post_count)
      setFollowerCount(follower_count ?? 0)
      setFollowingCount(following_count ?? 0)

      if ((!profile?.categories || profile.categories.length === 0) && post_count >= 3) {
        const catRes = await fetch('/api/users/recalculate-categories', { method: 'POST' })
        const catData = await catRes.json()
        if (catRes.ok && catData.categories) {
          setProfile((prev: any) => prev ? { ...prev, categories: catData.categories } : prev)
        }
      }

      const postsRes = await fetch('/api/me/posts?sort=latest')
      if (postsRes.ok) {
        const { posts } = await postsRes.json()
        setPosts(posts)
      }

      setLoading(false)
    }
    load()
  }, [router])

  async function handleSortChange(mode: SortMode) {
    setSortMode(mode)
    setSelectedCategory(null)
    if (mode === 'category') return

    const res = await fetch(`/api/me/posts?sort=${mode}`)
    if (res.ok) {
      const { posts } = await res.json()
      setPosts(posts)
    }
  }

  const displayedPosts = useMemo(() => {
    if (sortMode !== 'category' || !selectedCategory) return posts
    const keywords = CATEGORY_KEYWORDS[selectedCategory] ?? []
    return posts.filter((p) =>
      keywords.some((kw) => p.content.includes(kw))
    )
  }, [posts, sortMode, selectedCategory])

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

  const userCategories = (profile.categories ?? []) as CategoryId[]

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
            categories={userCategories}
            isMe
            onGenerateCard={handleGenerateCard}
            generating={generating}
            justGenerated={justGenerated}
          />
        </div>

        {/* Stats */}
        <div className="flex gap-4 text-sm text-center">
          <div className="flex-1 bg-white rounded-2xl py-3 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
            <p className="font-bold text-[#2F2B3A]">{followerCount}</p>
            <p className="text-xs text-[#B0AABF]">팔로워</p>
          </div>
          <div className="flex-1 bg-white rounded-2xl py-3 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
            <p className="font-bold text-[#2F2B3A]">{followingCount}</p>
            <p className="text-xs text-[#B0AABF]">팔로잉</p>
          </div>
          <div className="flex-1 bg-white rounded-2xl py-3 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
            <p className="font-bold text-[#2F2B3A]">{postCount}</p>
            <p className="text-xs text-[#B0AABF]">글</p>
          </div>
        </div>

        {/* Posts section */}
        {postCount > 0 && (
          <div className="flex flex-col gap-3">
            {/* Sort tabs */}
            <div className="flex gap-2">
              {(['latest', 'reactions', 'category'] as SortMode[]).map((mode) => {
                const label = mode === 'latest' ? '최신순' : mode === 'reactions' ? '반응순' : '카테고리별'
                return (
                  <button
                    key={mode}
                    onClick={() => handleSortChange(mode)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                      sortMode === mode
                        ? 'bg-[#7C6FCD] text-white'
                        : 'bg-[#F0EDFF] text-[#6B647A] hover:bg-[#E8E4FF]'
                    }`}
                  >
                    {label}
                  </button>
                )
              })}
            </div>

            {/* Category filter chips (only in category mode) */}
            {sortMode === 'category' && userCategories.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {userCategories.map((cid) => {
                  const cat = CATEGORIES.find((c) => c.id === cid)
                  return cat ? (
                    <button
                      key={cid}
                      onClick={() => setSelectedCategory(selectedCategory === cid ? null : cid)}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                        selectedCategory === cid
                          ? 'bg-[#CDBBFF] text-[#2F2B3A] scale-105'
                          : 'bg-[#F0EDFF] text-[#6B647A] hover:bg-[#E8E4FF]'
                      }`}
                    >
                      {cat.emoji} {cat.label}
                    </button>
                  ) : null
                })}
              </div>
            )}

            {sortMode === 'category' && userCategories.length === 0 && (
              <p className="text-xs text-[#B0AABF]">카테고리 태그가 아직 없어요. 글을 3개 이상 쓰면 자동으로 생겨요.</p>
            )}

            {/* Post list */}
            {displayedPosts.length > 0 ? (
              displayedPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))
            ) : (
              sortMode === 'category' && selectedCategory && (
                <p className="text-sm text-[#B0AABF] text-center py-4">이 카테고리에 해당하는 글이 없어요</p>
              )
            )}
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  )
}
