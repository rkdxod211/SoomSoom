import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createClient as createAdminClient } from '@supabase/supabase-js'

export async function GET(req: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { searchParams } = new URL(req.url)
  const category = searchParams.get('category')

  if (!category) return NextResponse.json({ users: [], posts: [] })

  const admin = createAdminClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  // Fetch users with this category tag + posts with this category in parallel
  const [usersRes, postsRes] = await Promise.all([
    admin
      .from('users')
      .select('id, character_type, character_color, character_name, categories')
      .contains('categories', [category])
      .limit(30),
    admin
      .from('posts')
      .select(`
        id, user_id, content, created_at,
        author:users!user_id(id, character_type, character_color, character_name, categories),
        replies(id)
      `)
      .eq('category', category)
      .is('deleted_at', null)
      .order('created_at', { ascending: false })
      .limit(30),
  ])

  // Get current user's bookmarks and follows
  let bookmarkedIds: string[] = []
  let followingIds: string[] = []
  if (user) {
    const [bookmarksRes, followsRes] = await Promise.all([
      admin.from('bookmarks').select('post_id').eq('user_id', user.id),
      admin.from('follows').select('following_id').eq('follower_id', user.id),
    ])
    bookmarkedIds = (bookmarksRes.data ?? []).map((b) => b.post_id)
    followingIds = (followsRes.data ?? []).map((f) => f.following_id)
  }

  // Enrich users with follow counts + is_following
  const enrichedUsers = await Promise.all((usersRes.data ?? []).map(async (u) => {
    const [{ count: follower_count }, followCheck] = await Promise.all([
      admin.from('follows').select('id', { count: 'exact', head: true }).eq('following_id', u.id),
      user
        ? admin.from('follows').select('id').eq('follower_id', user.id).eq('following_id', u.id).maybeSingle()
        : Promise.resolve({ data: null }),
    ])
    return {
      ...u,
      follower_count: follower_count ?? 0,
      is_following: !!followCheck.data,
    }
  }))

  const posts = (postsRes.data ?? []).map((post: any) => ({
    id: post.id,
    user_id: post.user_id,
    content: post.content,
    created_at: post.created_at,
    author: Array.isArray(post.author) ? post.author[0] : post.author,
    reply_count: (post.replies ?? []).length,
    is_bookmarked: bookmarkedIds.includes(post.id),
    is_following_author: followingIds.includes(post.user_id),
  }))

  return NextResponse.json({ users: enrichedUsers, posts })
}
