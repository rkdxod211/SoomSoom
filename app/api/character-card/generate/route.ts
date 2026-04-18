import { NextResponse } from 'next/server'
import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase/server'
import { generateCharacterCard } from '@/lib/ai/generate-character-card'

// Direct admin client — fully bypasses RLS
function createAdminClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

export async function POST() {
  const supabase = await createClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: posts, error: postsError } = await supabase
    .from('posts')
    .select('content')
    .eq('user_id', user.id)
    .is('deleted_at', null)
    .order('created_at', { ascending: false })
    .limit(10)

  if (postsError || !posts || posts.length < 5) {
    return NextResponse.json({ error: 'Not enough posts (minimum 5)' }, { status: 400 })
  }

  const contents = posts.map((p) => p.content)
  const result = await generateCharacterCard(contents)

  const admin = createAdminClient()
  const { data: card, error: cardError } = await admin
    .from('character_cards')
    .upsert({
      user_id: user.id,
      ...result,
      generated_from_count: posts.length,
      updated_at: new Date().toISOString(),
    }, { onConflict: 'user_id' })
    .select()
    .single()

  if (cardError) return NextResponse.json({ error: cardError.message }, { status: 500 })
  return NextResponse.json(card)
}
