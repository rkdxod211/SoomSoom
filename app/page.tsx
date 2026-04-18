import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
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
    <main
      className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #F5F0FF 0%, #FFFDF8 50%, #FFF0F8 100%)' }}
    >
      {/* Ambient blobs */}
      <div className="absolute top-[-80px] left-[-60px] w-64 h-64 rounded-full opacity-30 blur-3xl" style={{ background: '#CDBBFF' }} />
      <div className="absolute bottom-[-60px] right-[-40px] w-48 h-48 rounded-full opacity-20 blur-3xl" style={{ background: '#FFB8D9' }} />

      <div className="max-w-sm w-full flex flex-col items-center gap-10 relative z-10">

        {/* Logo */}
        <div className="flex flex-col items-center gap-6">
          {/* Character row */}
          <div className="flex items-end gap-1.5">
            <div className="opacity-60 scale-90 origin-bottom"><CharacterAvatar type="rabbit" color="mint" size={44} /></div>
            <div className="opacity-75 scale-95 origin-bottom"><CharacterAvatar type="cat" color="peach" size={52} /></div>
            <CharacterAvatar type="ghost" color="lavender" size={72} />
            <div className="opacity-75 scale-95 origin-bottom"><CharacterAvatar type="bear" color="butter" size={52} /></div>
            <div className="opacity-60 scale-90 origin-bottom"><CharacterAvatar type="slime" color="sky" size={44} /></div>
          </div>

          {/* soomsoom wordmark */}
          <div className="flex items-center gap-2">
            <svg width="32" height="32" viewBox="0 0 64 64" fill="none">
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
        </div>

        {/* Tagline */}
        <div className="text-center flex flex-col gap-2">
          <p className="text-lg font-semibold text-[#2F2B3A] leading-snug">
            정체는 숨기고<br />캐릭터로만 솔직하게
          </p>
          <p className="text-sm text-[#9B8FC4]">
            랜덤 캐릭터로 짧은 글을 올리는<br />익명 캐릭터 SNS
          </p>
        </div>

        {/* Features */}
        <div className="flex flex-wrap gap-2 justify-center">
          {[
            { icon: '🎲', text: '랜덤 캐릭터' },
            { icon: '🔒', text: '익명 보장' },
            { icon: '✨', text: 'AI 카드 분석' },
            { icon: '🏷️', text: '태그 탐색' },
          ].map((f) => (
            <span
              key={f.text}
              className="px-3.5 py-1.5 rounded-full text-xs font-medium"
              style={{ background: 'rgba(124,111,205,0.1)', color: '#7C6FCD' }}
            >
              {f.icon} {f.text}
            </span>
          ))}
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
            가입하면 랜덤 캐릭터 하나가 생겨요 🎲
          </p>
        </div>
      </div>
    </main>
  )
}
