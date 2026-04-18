'use client'

import { CharacterAvatar } from '@/components/character/character-avatar'
import { CharacterType, CharacterColor } from '@/types'

const CHARS: { type: CharacterType; color: CharacterColor }[] = [
  { type: 'ghost', color: 'lavender' },
  { type: 'rabbit', color: 'mint' },
  { type: 'cat', color: 'peach' },
  { type: 'bear', color: 'butter' },
  { type: 'slime', color: 'sky' },
  { type: 'robot', color: 'gray' },
]

const SLOT = 84
const n = CHARS.length
const DURATION = n * 1200 // ms per full loop

export function CharacterCarousel() {
  const chars = [...CHARS, ...CHARS]

  return (
    <div
      className="overflow-hidden relative"
      style={{
        width: SLOT * 5,
        height: 108,
        maskImage: 'linear-gradient(to right, transparent, black 18%, black 82%, transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 18%, black 82%, transparent)',
      }}
    >
      <style>{`
        @keyframes carousel-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-${n * SLOT}px); }
        }
      `}</style>
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          width: SLOT * chars.length,
          height: 108,
          animation: `carousel-scroll ${DURATION}ms linear infinite`,
        }}
      >
        {chars.map((char, i) => (
          <div
            key={i}
            style={{
              width: SLOT,
              height: 108,
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'center',
              paddingBottom: 4,
            }}
          >
            <CharacterAvatar type={char.type} color={char.color} size={80} />
          </div>
        ))}
      </div>
    </div>
  )
}
