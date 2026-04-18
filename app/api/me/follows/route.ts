import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createClient as createAdminClient } from '@supabase/supabase-js'

export async function GET(req: NextRequest) {
  const supabase = await createClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const type = new URL(req.url).searchParams.get('type') // 'followers' | 'following'

  const admin = createAdminClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  if (type === 'followers') {
    const { data } = await admin
      .from('follows')
      .select('follower:users!follower_id(id, character_type, character_color, character_name)')
      .eq('following_id', user.id)
    const users = (data ?? []).map((r: any) => Array.isArray(r.follower) ? r.follower[0] : r.follower)
    return NextResponse.json({ users })
  } else {
    const { data } = await admin
      .from('follows')
      .select('following:users!following_id(id, character_type, character_color, character_name)')
      .eq('follower_id', user.id)
    const users = (data ?? []).map((r: any) => Array.isArray(r.following) ? r.following[0] : r.following)
    return NextResponse.json({ users })
  }
}
