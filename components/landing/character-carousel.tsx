'use client'

import { useState, useEffect, useRef } from 'react'
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

const SLIDE_EASE = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' // smooth ease-out, no overshoot
const SPRING = 'cubic-bezier(0.34, 1.56, 0.64, 1)'         // bouncy spring for scale only
const SLOT = 84
const DUR = 480

function slotProps(dist: number) {
  if (dist === 0) return { scale: 1, opacity: 1 }
  if (dist === 1) return { scale: 0.72, opacity: 0.6 }
  return { scale: 0.54, opacity: 0.28 }
}

export function CharacterCarousel() {
  const [center, setCenter] = useState(0)
  const [tx, setTx] = useState(0)
  const [sliding, setSliding] = useState(false)
  const stripRef = useRef<HTMLDivElement>(null)

  const n = CHARS.length
  const get = (i: number) => CHARS[((i % n) + n) % n]

  useEffect(() => {
    const id = setInterval(() => {
      setSliding(true)
      setTx(-SLOT)
    }, 2400)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    if (!sliding) return
    const el = stripRef.current
    if (!el) return

    let done = false
    const reset = () => {
      if (done) return
      done = true
      setSliding(false)
      setTx(0)
      setCenter(c => (c + 1) % n)
    }

    const onEnd = (e: TransitionEvent) => {
      if (e.target === el && e.propertyName === 'transform') reset()
    }
    el.addEventListener('transitionend', onEnd)
    const fallback = setTimeout(reset, DUR + 80)

    return () => {
      el.removeEventListener('transitionend', onEnd)
      clearTimeout(fallback)
    }
  }, [sliding, n])

  const chars = Array.from({ length: 7 }, (_, i) => get(center - 3 + i))

  return (
    <div className="overflow-hidden relative" style={{ width: SLOT * 5, height: 108 }}>
      <div
        ref={stripRef}
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          width: SLOT * 7,
          height: 108,
          transform: `translateX(${tx - SLOT}px)`,
          transition: sliding ? `transform ${DUR}ms ${SLIDE_EASE}` : 'none',
        }}
      >
        {chars.map((char, i) => {
          const dist = Math.abs(i - 3)
          const { scale, opacity } = slotProps(dist)
          return (
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
              <div
                style={{
                  transform: `scale(${scale})`,
                  opacity,
                  transformOrigin: 'bottom center',
                  transition: `transform ${DUR}ms ${SPRING}, opacity ${DUR}ms ease`,
                }}
              >
                <CharacterAvatar type={char.type} color={char.color} size={80} />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
