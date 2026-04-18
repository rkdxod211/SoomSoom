import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: post, error } = await supabase
    .from('posts')
    .select(`
      id, user_id, content, created_at, deleted_at,
      author:users!user_id(id, character_type, character_color, character_name),
      reactions(reaction_type, user_id),
      replies(id, user_id, content, created_at, deleted_at, author:users!user_id(id, character_type, character_color, character_name))
    `)
    .eq('id', id)
    .is('deleted_at', null)
    .single()

  if (error || !post) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const reactionMap = new Map<string, { count: number; reacted: boolean }>()
  for (const r of (post.reactions ?? [])) {
    const existing = reactionMap.get(r.reaction_type) ?? { count: 0, reacted: false }
    reactionMap.set(r.reaction_type, {
      count: existing.count + 1,
      reacted: existing.reacted || r.user_id === user?.id,
    })
  }

  return NextResponse.json({
    ...post,
    author: Array.isArray(post.author) ? post.author[0] : post.author,
    reactions: Array.from(reactionMap.entries()).map(([type, v]) => ({
      reaction_type: type,
      count: v.count,
      reacted_by_me: v.reacted,
    })),
    my_reaction: Array.from(reactionMap.entries()).find(([, v]) => v.reacted)?.[0] ?? null,
    replies: (post.replies ?? [])
      .filter((r: any) => !r.deleted_at)
      .map((r: any) => ({
        ...r,
        author: Array.isArray(r.author) ? r.author[0] : r.author,
      })),
  })
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { error } = await supabase
    .from('posts')
    .update({ deleted_at: new Date().toISOString() })
    .eq('id', id)
    .eq('user_id', user.id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
