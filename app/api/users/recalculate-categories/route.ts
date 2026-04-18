import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import { detectCategories } from '@/lib/character/categories'

export async function POST() {
  const supabase = await createClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: posts } = await supabase
    .from('posts')
    .select('content')
    .eq('user_id', user.id)
    .is('deleted_at', null)
    .order('created_at', { ascending: false })
    .limit(20)

  if (!posts || posts.length < 3) {
    return NextResponse.json({ categories: [] })
  }

  const categories = await detectCategories(posts.map((p) => p.content))

  const admin = createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
  await admin.from('users').update({ categories }).eq('id', user.id)

  return NextResponse.json({ categories })
}
