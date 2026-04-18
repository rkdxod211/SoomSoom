import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(req: NextRequest) {
  const supabase = await createClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const sort = searchParams.get('sort') ?? 'latest' // latest | reactions

  const [postsRes, bookmarksRes] = await Promise.all([
    supabase
      .from('posts')
      .select(`
        id, user_id, content, created_at,
        author:users!user_id(id, character_type, character_color, character_name, categories),
        replies(id),
        bookmarks(id)
      `)
      .eq('user_id', user.id)
      .is('deleted_at', null)
      .order('created_at', { ascending: false }),
    supabase
      .from('bookmarks')
      .select('post_id')
      .eq('user_id', user.id),
  ])

  if (postsRes.error) return NextResponse.json({ error: postsRes.error.message }, { status: 500 })

  const myBookmarkedIds = new Set((bookmarksRes.data ?? []).map((b) => b.post_id))

  let posts = (postsRes.data ?? []).map((post: any) => ({
    id: post.id,
    user_id: post.user_id,
    content: post.content,
    created_at: post.created_at,
    author: Array.isArray(post.author) ? post.author[0] : post.author,
    reply_count: (post.replies ?? []).length,
    bookmark_count: (post.bookmarks ?? []).length,
    reaction_count: (post.replies ?? []).length + (post.bookmarks ?? []).length,
    is_bookmarked: myBookmarkedIds.has(post.id),
  }))

  if (sort === 'reactions') {
    posts.sort((a, b) =>
      b.reaction_count - a.reaction_count ||
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )
  }

  return NextResponse.json({ posts })
}
