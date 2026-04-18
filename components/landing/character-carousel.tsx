'use client'

import { useRef, useEffect } from 'react'
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

const SLOT = 108
const n = CHARS.length
const LOOP = n * SLOT
const SPEED = 55       // px/s
const VIEWPORT = SLOT * 5
const CENTER = VIEWPORT / 2
const SCALE_DIST = SLOT * 1.4

function slotStyle(x: number) {
  const dist = Math.abs(x + SLOT / 2 - CENTER)
  const t = Math.max(0, 1 - dist / SCALE_DIST)
  return { scale: 0.55 + 0.45 * t, opacity: 0.28 + 0.72 * t }
}

export function CharacterCarousel() {
  const refs = useRef<(HTMLDivElement | null)[]>([])
  const offsetRef = useRef(0)
  const lastTRef = useRef<number | null>(null)

  useEffect(() => {
    let raf: number

    const tick = (t: number) => {
      if (lastTRef.current != null) {
        offsetRef.current += SPEED * (t - lastTRef.current) / 1000
        if (offsetRef.current >= LOOP) offsetRef.current -= LOOP
      }
      lastTRef.current = t

      const off = offsetRef.current
      for (let i = 0; i < n; i++) {
        const el = refs.current[i]
        if (!el) continue
        let x = i * SLOT - off
        if (x < -SLOT) x += LOOP
        const { scale, opacity } = slotStyle(x)
        el.style.transform = `translateX(${x}px) scale(${scale})`
        el.style.opacity = String(opacity)
      }

      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div
      style={{
        width: VIEWPORT,
        height: 108,
        overflow: 'hidden',
        position: 'relative',
        maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
      }}
    >
      {CHARS.map((char, i) => {
        const initX = i * SLOT
        const { scale, opacity } = slotStyle(initX)
        return (
          <div
            key={i}
            ref={el => { refs.current[i] = el }}
            style={{
              position: 'absolute',
              left: 0,
              width: SLOT,
              height: 108,
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'center',
              paddingBottom: 4,
              transformOrigin: 'bottom center',
              transform: `translateX(${initX}px) scale(${scale})`,
              opacity,
            }}
          >
            <CharacterAvatar type={char.type} color={char.color} size={80} />
          </div>
        )
      })}
    </div>
  )
}
