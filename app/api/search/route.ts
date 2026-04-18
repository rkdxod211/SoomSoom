import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(req: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { searchParams } = new URL(req.url)
  const category = searchParams.get('category')

  if (!category) return NextResponse.json({ users: [] })

  // Find users whose categories array contains the given category
  const { data: users, error } = await supabase
    .from('users')
    .select('id, character_type, character_color, character_name, categories')
    .contains('categories', [category])
    .limit(30)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  // Get follower counts and following status
  const enriched = await Promise.all((users ?? []).map(async (u) => {
    const [{ count: follower_count }, { count: following_count }, followCheck] = await Promise.all([
      supabase.from('follows').select('id', { count: 'exact', head: true }).eq('following_id', u.id),
      supabase.from('follows').select('id', { count: 'exact', head: true }).eq('follower_id', u.id),
      user ? supabase.from('follows').select('id').eq('follower_id', user.id).eq('following_id', u.id).maybeSingle() : Promise.resolve({ data: null }),
    ])
    return {
      ...u,
      follower_count: follower_count ?? 0,
      following_count: following_count ?? 0,
      is_following: !!followCheck.data,
    }
  }))

  return NextResponse.json({ users: enriched })
}
