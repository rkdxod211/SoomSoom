'use client'

import { useState, useEffect } from 'react'
import { CharacterAvatar } from '@/components/character/character-avatar'
import { CharacterType, CharacterColor } from '@/types'

const CHARACTERS: { type: CharacterType; color: CharacterColor }[] = [
  { type: 'ghost', color: 'lavender' },
  { type: 'rabbit', color: 'mint' },
  { type: 'cat', color: 'peach' },
  { type: 'bear', color: 'butter' },
  { type: 'slime', color: 'sky' },
  { type: 'robot', color: 'gray' },
]

export function CharacterCarousel() {
  const [start, setStart] = useState(0)
  const [sliding, setSliding] = useState(false)

  useEffect(() => {
    const id = setInterval(() => {
      setSliding(true)
      setTimeout(() => {
        setStart((s) => (s + 1) % CHARACTERS.length)
        setSliding(false)
      }, 350)
    }, 2000)
    return () => clearInterval(id)
  }, [])

  const visible = Array.from({ length: 5 }, (_, i) =>
    CHARACTERS[(start + i) % CHARACTERS.length]
  )

  return (
    <div className="flex items-end justify-center gap-2">
      {visible.map((char, i) => {
        const isCenter = i === 2
        const isNear = i === 1 || i === 3
        return (
          <div
            key={`${start}-${i}`}
            className="transition-all duration-350 ease-in-out"
            style={{
              opacity: isCenter ? 1 : isNear ? 0.65 : 0.35,
              transform: `translateX(${sliding ? '-12px' : '0'}) scale(${isCenter ? 1 : isNear ? 0.8 : 0.65})`,
              transformOrigin: 'bottom center',
              transitionDuration: '350ms',
            }}
          >
            <CharacterAvatar
              type={char.type}
              color={char.color}
              size={isCenter ? 80 : isNear ? 56 : 44}
            />
          </div>
        )
      })}
    </div>
  )
}
