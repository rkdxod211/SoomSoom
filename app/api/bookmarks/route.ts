import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  const supabase = await createClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data, error } = await supabase
    .from('bookmarks')
    .select(`
      post_id,
      created_at,
      post:posts!post_id(
        id, user_id, content, created_at, deleted_at,
        author:users!user_id(id, character_type, character_color, character_name, categories),
        replies(id)
      )
    `)
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  const posts = (data ?? [])
    .map((b: any) => {
      const post = Array.isArray(b.post) ? b.post[0] : b.post
      if (!post || post.deleted_at) return null
      return {
        id: post.id,
        user_id: post.user_id,
        content: post.content,
        created_at: post.created_at,
        author: Array.isArray(post.author) ? post.author[0] : post.author,
        reply_count: (post.replies ?? []).length,
        is_bookmarked: true,
      }
    })
    .filter(Boolean)

  return NextResponse.json({ posts })
}
