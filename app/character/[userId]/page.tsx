import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { BottomNav } from '@/components/layout/bottom-nav'
import { CharacterCardPanel } from '@/components/character/character-card-panel'
import { PostCard } from '@/components/post/post-card'
import { User, Post } from '@/types'

export default async function CharacterPage({ params }: { params: Promise<{ userId: string }> }) {
  const { userId } = await params
  const supabase = await createClient()

  const { data: profile, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single()

  if (error || !profile) notFound()

  const { data: card } = await supabase
    .from('character_cards')
    .select('*')
    .eq('user_id', userId)
    .single()

  const { data: posts, count } = await supabase
    .from('posts')
    .select(`
      id, user_id, content, created_at, deleted_at,
      author:users!user_id(id, character_type, character_color, character_name),
      reactions(reaction_type, user_id),
      replies(id)
    `, { count: 'exact' })
    .eq('user_id', userId)
    .is('deleted_at', null)
    .order('created_at', { ascending: false })
    .limit(10)

  const formattedPosts: Post[] = (posts ?? []).map((p: any) => ({
    ...p,
    author: Array.isArray(p.author) ? p.author[0] : p.author,
    reactions: [],
    reply_count: (p.replies ?? []).length,
  }))

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#FFFDF8' }}>
      <header className="sticky top-0 z-50 bg-[#FFFDF8]/90 backdrop-blur-sm border-b border-[#F0EDFF]">
        <div className="max-w-md mx-auto px-4 h-14 flex items-center gap-3">
          <Link href="/feed" className="text-[#6B647A] hover:text-[#2F2B3A]">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-base font-semibold text-[#2F2B3A]">{profile.character_name}</h1>
        </div>
      </header>

      <main className="flex-1 max-w-md mx-auto w-full px-4 pt-4 pb-24 flex flex-col gap-4">
        <CharacterCardPanel
          type={profile.character_type}
          color={profile.character_color}
          name={profile.character_name}
          card={card ?? null}
          postCount={count ?? 0}
          isMe={false}
        />

        {formattedPosts.length > 0 && (
          <div className="flex flex-col gap-3">
            <h2 className="text-xs font-semibold text-[#9B8FC4] uppercase tracking-wider">이 캐릭터의 글</h2>
            {formattedPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  )
}
