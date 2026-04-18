import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { assignRandomCharacter } from '@/lib/character/assign'

export async function POST() {
  const supabase = await createClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { data: existing } = await supabase
    .from('users')
    .select('id, onboarded')
    .eq('id', user.id)
    .single()

  if (existing?.onboarded) {
    return NextResponse.json({ message: 'Already onboarded' })
  }

  const character = assignRandomCharacter()

  const { data, error } = await supabase
    .from('users')
    .upsert({
      id: user.id,
      ...character,
      onboarded: true,
    })
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}
