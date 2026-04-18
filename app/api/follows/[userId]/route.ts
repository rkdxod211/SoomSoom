import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(req: NextRequest, { params }: { params: Promise<{ userId: string }> }) {
  const { userId: following_id } = await params
  const supabase = await createClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  if (user.id === following_id) return NextResponse.json({ error: 'Cannot follow yourself' }, { status: 400 })

  const { error } = await supabase
    .from('follows')
    .insert({ follower_id: user.id, following_id })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ following: true })
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ userId: string }> }) {
  const { userId: following_id } = await params
  const supabase = await createClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { error } = await supabase
    .from('follows')
    .delete()
    .eq('follower_id', user.id)
    .eq('following_id', following_id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ following: false })
}
