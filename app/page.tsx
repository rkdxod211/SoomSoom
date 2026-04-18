import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { CharacterCarousel } from '@/components/landing/character-carousel'

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
    <main
      className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #F5F0FF 0%, #FFFDF8 50%, #FFF0F8 100%)' }}
    >
      {/* Ambient blobs */}
      <div className="absolute top-[-80px] left-[-60px] w-64 h-64 rounded-full opacity-30 blur-3xl" style={{ background: '#CDBBFF' }} />
      <div className="absolute bottom-[-60px] right-[-40px] w-48 h-48 rounded-full opacity-20 blur-3xl" style={{ background: '#FFB8D9' }} />

      <div className="max-w-sm w-full flex flex-col items-center gap-10 relative z-10">

        {/* Character carousel */}
        <CharacterCarousel />

        {/* Logo + tagline */}
        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center gap-2">
            <svg width="30" height="30" viewBox="0 0 64 64" fill="none">
              <defs>
                <linearGradient id="g" x1="32" y1="14" x2="32" y2="56" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#D8C4FF" />
                  <stop offset="100%" stopColor="#B89EF0" />
                </linearGradient>
              </defs>
              <path d="M14 36 Q14 16 32 16 Q50 16 50 36 L50 54 L44 50 L38 54 L32 50 L26 54 L20 50 L14 54 Z"
                fill="url(#g)" stroke="#2F2B3A" strokeWidth="2.5" strokeLinejoin="round" />
              <ellipse cx="25.5" cy="35" rx="3.5" ry="4.5" fill="#2F2B3A" />
              <ellipse cx="38.5" cy="35" rx="3.5" ry="4.5" fill="#2F2B3A" />
            </svg>
            <span className="text-3xl font-black text-[#2F2B3A] tracking-tight">soomsoom</span>
          </div>
          <p className="text-base text-[#6B647A] text-center">
            이름 말고, 무드로 남는 곳
          </p>
        </div>

        {/* CTA */}
        <div className="w-full flex flex-col gap-3">
          <Link
            href="/login"
            className="w-full py-4 rounded-2xl text-base font-bold text-white text-center"
            style={{ background: 'linear-gradient(135deg, #9B8FC4, #7C6FCD)' }}
          >
            캐릭터로 시작하기
          </Link>
          <p className="text-xs text-center text-[#B0AABF]">
            가입하면 랜덤 캐릭터 하나가 생겨요
          </p>
        </div>
      </div>
    </main>
  )
}
