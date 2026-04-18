import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(req: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { searchParams } = new URL(req.url)
  const cursor = searchParams.get('cursor')
  const limit = 20

  let query = supabase
    .from('posts')
    .select(`
      id, user_id, content, created_at, deleted_at,
      author:users!user_id(id, character_type, character_color, character_name),
      reactions(reaction_type, user_id),
      replies(id)
    `)
    .is('deleted_at', null)
    .order('created_at', { ascending: false })
    .limit(limit)

  if (cursor) {
    query = query.lt('created_at', cursor)
  }

  const { data, error } = await query

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  const posts = (data ?? []).map((post: any) => {
    const reactionMap = new Map<string, { count: number; reacted: boolean }>()

    for (const r of (post.reactions ?? [])) {
      const existing = reactionMap.get(r.reaction_type) ?? { count: 0, reacted: false }
      reactionMap.set(r.reaction_type, {
        count: existing.count + 1,
        reacted: existing.reacted || r.user_id === user?.id,
      })
    }

    return {
      id: post.id,
      user_id: post.user_id,
      content: post.content,
      created_at: post.created_at,
      deleted_at: post.deleted_at,
      author: Array.isArray(post.author) ? post.author[0] : post.author,
      reactions: Array.from(reactionMap.entries()).map(([type, v]) => ({
        reaction_type: type,
        count: v.count,
        reacted_by_me: v.reacted,
      })),
      reply_count: (post.replies ?? []).length,
      my_reaction: Array.from(reactionMap.entries()).find(([, v]) => v.reacted)?.[0] ?? null,
    }
  })

  return NextResponse.json({ posts })
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
  return NextResponse.json(data, { status: 201 })
}
