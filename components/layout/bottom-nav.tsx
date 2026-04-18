'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, PlusCircle, User } from 'lucide-react'

const NAV_ITEMS = [
  { href: '/feed', icon: Home, label: '피드' },
  { href: '/write', icon: PlusCircle, label: '글쓰기' },
  { href: '/me', icon: User, label: '내 캐릭터' },
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#FFFDF8]/90 backdrop-blur-sm border-t border-[#F0EDFF]">
      <div className="max-w-md mx-auto flex">
        {NAV_ITEMS.map(({ href, icon: Icon, label }) => {
          const active = pathname === href || (href === '/feed' && pathname.startsWith('/post'))
          return (
            <Link
              key={href}
              href={href}
              className={`flex-1 flex flex-col items-center gap-0.5 py-2.5 transition-colors ${
                active ? 'text-[#7C5CFC]' : 'text-[#B0AABF]'
              }`}
            >
              <Icon size={22} strokeWidth={active ? 2.5 : 1.8} />
              <span className="text-[10px] font-medium">{label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
