import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { Button } from '@/components/ui/button'
import { CharacterAvatar } from '@/components/character/character-avatar'

export default async function LandingPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (user) {
    const { data: profile } = await supabase
      .from('users')
      .select('onboarded')
      .eq('id', user.id)
      .single()

    if (profile?.onboarded) redirect('/feed')
    else redirect('/onboarding')
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6" style={{ background: '#FFFDF8' }}>
      <div className="max-w-sm w-full flex flex-col items-center gap-8">
        {/* Characters preview */}
        <div className="flex gap-2 items-end">
          <CharacterAvatar type="ghost" color="lavender" size={48} />
          <CharacterAvatar type="rabbit" color="mint" size={64} />
          <CharacterAvatar type="cat" color="peach" size={48} />
          <CharacterAvatar type="bear" color="butter" size={56} />
          <CharacterAvatar type="slime" color="sky" size={44} />
        </div>

        {/* Title */}
        <div className="text-center flex flex-col gap-2">
          <h1 className="text-4xl font-bold text-[#2F2B3A] tracking-tight">숨숨</h1>
          <p className="text-base text-[#6B647A] leading-relaxed">
            정체는 숨기고<br />
            <strong className="text-[#2F2B3A]">캐릭터로만</strong> 솔직해지는 SNS
          </p>
        </div>

        {/* Feature pills */}
        <div className="flex flex-wrap gap-2 justify-center">
          {['랜덤 캐릭터 자동 지급', '짧은 글만', '내 정체는 비밀', 'AI 캐릭터 분석'].map((f) => (
            <span
              key={f}
              className="px-3 py-1 rounded-full text-xs font-medium bg-[#F0EDFF] text-[#7C5CFC]"
            >
              {f}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div className="w-full flex flex-col gap-3">
          <Link href="/login" className="w-full">
            <Button size="lg" className="w-full text-base">
              캐릭터로 시작하기
            </Button>
          </Link>
          <p className="text-xs text-center text-[#B0AABF]">
            가입하면 랜덤 캐릭터 하나가 생겨요
          </p>
        </div>
      </div>
    </main>
  )
}
