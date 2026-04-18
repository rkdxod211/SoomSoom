import Link from 'next/link'
import { User } from '@/types'
import { CharacterAvatar } from '@/components/character/character-avatar'

interface AppHeaderProps {
  user?: User | null
}

export function AppHeader({ user }: AppHeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-[#FFFDF8]/90 backdrop-blur-sm border-b border-[#F0EDFF]">
      <div className="max-w-md mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/feed" className="text-xl font-bold text-[#2F2B3A] tracking-tight">
          숨숨
        </Link>
        {user && (
          <Link href="/me">
            <CharacterAvatar
              type={user.character_type}
              color={user.character_color}
              size={32}
              className="cursor-pointer hover:scale-110 transition-transform"
            />
          </Link>
        )}
      </div>
    </header>
  )
}
