import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(req: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { searchParams } = new URL(req.url)
  const limit = 30

  // Get following list for current user
  let followingIds: string[] = []
  if (user) {
    const { data: follows } = await supabase
      .from('follows')
      .select('following_id')
      .eq('follower_id', user.id)
    followingIds = (follows ?? []).map((f) => f.following_id)
  }

  // Get bookmarked post ids
  let bookmarkedIds: string[] = []
  if (user) {
    const { data: bookmarks } = await supabase
      .from('bookmarks')
      .select('post_id')
      .eq('user_id', user.id)
    bookmarkedIds = (bookmarks ?? []).map((b) => b.post_id)
  }

  const { data, error } = await supabase
    .from('posts')
    .select(`
      id, user_id, content, created_at, deleted_at,
      author:users!user_id(id, character_type, character_color, character_name, categories),
      replies(id)
    `)
    .is('deleted_at', null)
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  const posts = (data ?? []).map((post: any) => {
    const replyCount = (post.replies ?? []).length
    const isFollowing = followingIds.includes(post.user_id)
    const score = (isFollowing ? 1000 : 0) + replyCount * 2
    return {
      id: post.id,
      user_id: post.user_id,
      content: post.content,
      created_at: post.created_at,
      author: Array.isArray(post.author) ? post.author[0] : post.author,
      reply_count: replyCount,
      is_bookmarked: bookmarkedIds.includes(post.id),
      is_following_author: isFollowing,
      _score: score,
    }
  })

  posts.sort((a, b) => b._score - a._score || new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

  return NextResponse.json({ posts: posts.map(({ _score, ...p }) => p) })
}

export async function POST(req: NextRequest) {
  const supabase = await createClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { content } = await req.json()
  if (!content?.trim()) return NextResponse.json({ error: 'Content required' }, { status: 400 })
  if (content.length > 120) return NextResponse.json({ error: 'Too long' }, { status: 400 })

  const { data, error } = await supabase
    .from('posts')
    .insert({ user_id: user.id, content: content.trim() })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  // Async: classify post category + update user categories
  classifyPostCategory(data.id, content.trim())
  updateUserCategories(user.id, supabase)

  return NextResponse.json(data, { status: 201 })
}

async function classifyPostCategory(postId: string, content: string) {
  try {
    const { detectPostCategory } = await import('@/lib/character/categories')
    const { createClient: createAdminClient } = await import('@supabase/supabase-js')
    const category = await detectPostCategory(content)
    if (category) {
      const admin = createAdminClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
      )
      await admin.from('posts').update({ category }).eq('id', postId)
    }
  } catch {}
}

async function updateUserCategories(userId: string, supabase: any) {
  try {
    const { detectCategories } = await import('@/lib/character/categories')
    const { data: posts } = await supabase
      .from('posts')
      .select('content')
      .eq('user_id', userId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false })
      .limit(20)

    if (!posts || posts.length < 3) return

    const categories = await detectCategories(posts.map((p: any) => p.content))
    await supabase.from('users').update({ categories }).eq('id', userId)
  } catch {}
}
