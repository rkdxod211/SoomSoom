'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { AppHeader } from '@/components/layout/app-header'
import { BottomNav } from '@/components/layout/bottom-nav'
import { PostCard } from '@/components/post/post-card'
import { Post } from '@/types'
import { Bookmark } from 'lucide-react'

export default function BookmarksPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    async function load() {
      const res = await fetch('/api/bookmarks')
      if (!res.ok) { router.push('/login'); return }
      const { posts } = await res.json()
      setPosts(posts)
      setLoading(false)
    }
    load()
  }, [router])

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#FFFDF8' }}>
      <AppHeader />

      <main className="flex-1 max-w-md mx-auto w-full px-4 pt-4 pb-24 flex flex-col gap-4">
        <h1 className="text-base font-bold text-[#2F2B3A]">북마크</h1>

        {loading && (
          <p className="text-sm text-[#B0AABF] text-center py-12">불러오는 중...</p>
        )}

        {!loading && posts.length === 0 && (
          <div className="flex flex-col items-center gap-2 py-16 text-[#B0AABF]">
            <Bookmark size={32} strokeWidth={1.5} />
            <p className="text-sm">북마크한 글이 없어요</p>
          </div>
        )}

        {!loading && posts.length > 0 && (
          <div className="flex flex-col gap-3">
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
