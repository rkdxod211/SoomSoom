import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { AppHeader } from '@/components/layout/app-header'
import { BottomNav } from '@/components/layout/bottom-nav'
import { PostCard } from '@/components/post/post-card'
import { PostComposer } from '@/components/post/post-composer'
import { User, Post } from '@/types'

async function getPosts(userId: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'}/api/posts`, {
    cache: 'no-store',
  })
  if (!res.ok) return []
  const { posts } = await res.json()
  return posts as (Post & { my_reaction?: string | null })[]
}

export default async function FeedPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single()

  if (!profile?.onboarded) redirect('/onboarding')

  const posts = await getPosts(user.id)

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#FFFDF8' }}>
      <AppHeader user={profile as User} />

      <main className="flex-1 max-w-md mx-auto w-full px-4 pt-4 pb-24 flex flex-col gap-4">
        {/* Composer */}
        <PostComposer />

        {/* Feed */}
        {posts.length === 0 ? (
          <div className="text-center py-16 text-[#B0AABF] text-sm">
            아직 아무도 없어요. 첫 글을 써봐요 ✨
          </div>
        ) : (
          posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))
        )}
      </main>

      <BottomNav />
    </div>
  )
}
