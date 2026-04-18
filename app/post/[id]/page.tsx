import { redirect, notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { AppHeader } from '@/components/layout/app-header'
import { BottomNav } from '@/components/layout/bottom-nav'
import { PostCard } from '@/components/post/post-card'
import { ReplyList } from '@/components/post/reply-list'
import { ReplyComposer } from '@/components/post/reply-composer'
import { Post, Reply, User } from '@/types'

export default async function PostDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase.from('users').select('*').eq('id', user.id).single()
  if (!profile?.onboarded) redirect('/onboarding')

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'}/api/posts/${id}`,
    { cache: 'no-store' }
  )
  if (!res.ok) notFound()

  const postData = await res.json()
  const post: Post = {
    ...postData,
    reactions: postData.reactions ?? [],
    reply_count: (postData.replies ?? []).length,
  }
  const replies: Reply[] = postData.replies ?? []

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#FFFDF8' }}>
      <header className="sticky top-0 z-50 bg-[#FFFDF8]/90 backdrop-blur-sm border-b border-[#F0EDFF]">
        <div className="max-w-md mx-auto px-4 h-14 flex items-center gap-3">
          <Link href="/feed" className="text-[#6B647A] hover:text-[#2F2B3A]">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-base font-semibold text-[#2F2B3A]">대화</h1>
        </div>
      </header>

      <main className="flex-1 max-w-md mx-auto w-full px-4 pt-4 pb-32 flex flex-col gap-6">
        {/* Original post */}
        <PostCard post={post} showReplies={false} />

        {/* Replies */}
        <div className="flex flex-col gap-3">
          <h2 className="text-xs font-semibold text-[#9B8FC4] uppercase tracking-wider">
            답글 {replies.length}개
          </h2>
          <ReplyList replies={replies} />
        </div>

        {/* Reply composer */}
        <div className="bg-white rounded-3xl p-4 shadow-[0_2px_16px_rgba(0,0,0,0.06)]">
          <ReplyComposer postId={id} />
        </div>
      </main>

      <BottomNav />
    </div>
  )
}
