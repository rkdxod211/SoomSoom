import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id: post_id } = await params
  const supabase = await createClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { reaction_type } = await req.json()

  // Delete existing reaction first
  await supabase
    .from('reactions')
    .delete()
    .eq('post_id', post_id)
    .eq('user_id', user.id)

  if (reaction_type) {
    const { error } = await supabase
      .from('reactions')
      .insert({ post_id, user_id: user.id, reaction_type })

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
