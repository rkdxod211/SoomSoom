import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { BottomNav } from '@/components/layout/bottom-nav'
import { CharacterCardPanel } from '@/components/character/character-card-panel'
import { FollowButton } from '@/components/character/follow-button'
import { PostCard } from '@/components/post/post-card'
import { CATEGORIES } from '@/lib/character/categories'
import { Post } from '@/types'

export default async function CharacterPage({ params }: { params: Promise<{ userId: string }> }) {
  const { userId } = await params
  const supabase = await createClient()
  const { data: { user: me } } = await supabase.auth.getUser()

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

  const [
    { count: follower_count },
    { count: following_count },
    { count: post_count },
    followCheck,
    { data: postsRaw },
  ] = await Promise.all([
    supabase.from('follows').select('id', { count: 'exact', head: true }).eq('following_id', userId),
    supabase.from('follows').select('id', { count: 'exact', head: true }).eq('follower_id', userId),
    supabase.from('posts').select('id', { count: 'exact', head: true }).eq('user_id', userId).is('deleted_at', null),
    me ? supabase.from('follows').select('id').eq('follower_id', me.id).eq('following_id', userId).maybeSingle() : Promise.resolve({ data: null }),
    supabase.from('posts').select(`
      id, user_id, content, created_at, deleted_at,
      author:users!user_id(id, character_type, character_color, character_name, categories),
      replies(id)
    `).eq('user_id', userId).is('deleted_at', null).order('created_at', { ascending: false }).limit(10),
  ])

  const isMe = me?.id === userId
  const isFollowing = !!followCheck?.data

  const posts: Post[] = (postsRaw ?? []).map((p: any) => ({
    ...p,
    author: Array.isArray(p.author) ? p.author[0] : p.author,
    reply_count: (p.replies ?? []).length,
    is_bookmarked: false,
  }))

  const categories = (profile.categories ?? []) as string[]

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#FFFDF8' }}>
      <header className="sticky top-0 z-50 bg-[#FFFDF8]/90 backdrop-blur-sm border-b border-[#F0EDFF]">
        <div className="max-w-md mx-auto px-4 h-14 flex items-center gap-3">
          <Link href="/feed" className="text-[#6B647A] hover:text-[#2F2B3A]">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-base font-semibold text-[#2F2B3A] flex-1">{profile.character_name}</h1>
          {!isMe && <FollowButton userId={userId} initialFollowing={isFollowing} />}
        </div>
      </header>

      <main className="flex-1 max-w-md mx-auto w-full px-4 pt-4 pb-24 flex flex-col gap-4">
        <CharacterCardPanel
          type={profile.character_type}
          color={profile.character_color}
          name={profile.character_name}
          card={card ?? null}
          postCount={post_count ?? 0}
          isMe={false}
        />

        {/* Stats */}
        <div className="flex gap-4 text-sm text-center">
          <div className="flex-1 bg-white rounded-2xl py-3 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
            <p className="font-bold text-[#2F2B3A]">{follower_count ?? 0}</p>
            <p className="text-xs text-[#B0AABF]">팔로워</p>
          </div>
          <div className="flex-1 bg-white rounded-2xl py-3 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
            <p className="font-bold text-[#2F2B3A]">{following_count ?? 0}</p>
            <p className="text-xs text-[#B0AABF]">팔로잉</p>
          </div>
          <div className="flex-1 bg-white rounded-2xl py-3 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
            <p className="font-bold text-[#2F2B3A]">{post_count ?? 0}</p>
            <p className="text-xs text-[#B0AABF]">글</p>
          </div>
        </div>

        {/* Categories */}
        {categories.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {categories.map((cid) => {
              const cat = CATEGORIES.find((c) => c.id === cid)
              return cat ? (
                <span key={cid} className="px-3 py-1 rounded-full text-xs font-medium bg-[#F0EDFF] text-[#6B647A]">
                  {cat.emoji} {cat.label}
                </span>
              ) : null
            })}
          </div>
        )}

        {/* Posts */}
        {posts.length > 0 && (
          <div className="flex flex-col gap-3">
            <h2 className="text-xs font-semibold text-[#9B8FC4] uppercase tracking-wider">이 캐릭터의 글</h2>
            {posts.map((post) => <PostCard key={post.id} post={post} />)}
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  )
}
