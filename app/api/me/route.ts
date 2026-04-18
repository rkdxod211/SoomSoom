import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  const supabase = await createClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const [
    { data: profile },
    { data: card },
    { count: post_count },
    { count: follower_count },
    { count: following_count },
  ] = await Promise.all([
    supabase.from('users').select('*').eq('id', user.id).single(),
    supabase.from('character_cards').select('*').eq('user_id', user.id).single(),
    supabase.from('posts').select('id', { count: 'exact', head: true }).eq('user_id', user.id).is('deleted_at', null),
    supabase.from('follows').select('id', { count: 'exact', head: true }).eq('following_id', user.id),
    supabase.from('follows').select('id', { count: 'exact', head: true }).eq('follower_id', user.id),
  ])

  return NextResponse.json({
    profile,
    card,
    post_count: post_count ?? 0,
    follower_count: follower_count ?? 0,
    following_count: following_count ?? 0,
  })
}
