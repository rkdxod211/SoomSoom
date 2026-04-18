'use client'

import { CharacterCard, CharacterColor, CharacterType, CHARACTER_COLOR_HEX } from '@/types'
import { CharacterAvatar } from './character-avatar'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CATEGORIES } from '@/lib/character/categories'

interface CharacterCardPanelProps {
  type: CharacterType
  color: CharacterColor
  name: string
  card: CharacterCard | null
  postCount: number
  categories?: string[]
  isMe?: boolean
  onGenerateCard?: () => void
  generating?: boolean
  justGenerated?: boolean
}

export function CharacterCardPanel({
  type,
  color,
  name,
  card,
  postCount,
  categories = [],
  isMe = false,
  onGenerateCard,
  generating = false,
  justGenerated = false,
}: CharacterCardPanelProps) {
  const mainColor = CHARACTER_COLOR_HEX[color]
  const canGenerate = postCount >= 5

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Character display */}
      <div
        className="w-full rounded-3xl p-8 flex flex-col items-center gap-3 relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${mainColor}60, ${mainColor}20)` }}
      >
        <CharacterAvatar type={type} color={color} size={generating ? 80 : 96} className={generating ? 'animate-pulse' : ''} />
        <h2 className="text-2xl font-bold text-[#2F2B3A]">{name}</h2>
        <p className="text-sm text-[#6B647A]">글 {postCount}개</p>
        {categories.length > 0 && (
          <div className="flex flex-wrap justify-center gap-1.5 mt-1">
            {categories.map((cid) => {
              const cat = CATEGORIES.find((c) => c.id === cid)
              return cat ? (
                <span
                  key={cid}
                  className="px-2.5 py-1 rounded-full text-xs font-medium"
                  style={{ backgroundColor: `${mainColor}60`, color: '#2F2B3A' }}
                >
                  {cat.emoji} {cat.label}
                </span>
              ) : null
            })}
          </div>
        )}
        {generating && (
          <div className="absolute inset-0 flex flex-col items-center justify-center rounded-3xl"
            style={{ background: `${mainColor}90`, backdropFilter: 'blur(2px)' }}>
            <p className="text-sm font-semibold text-[#2F2B3A] animate-pulse">✨ AI가 분석 중이에요...</p>
          </div>
        )}
      </div>

      {/* AI Card */}
      {card ? (
        <Card className={`w-full p-5 flex flex-col gap-4 transition-all duration-700 ${justGenerated ? 'ring-2 ring-offset-2 ring-[#CDBBFF]' : ''}`}>
          {justGenerated && (
            <div className="text-center py-1">
              <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ background: mainColor, color: '#2F2B3A' }}>
                ✨ 캐릭터 카드가 생겼어요!
              </span>
            </div>
          )}
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#9B8FC4] uppercase tracking-wider">AI 캐릭터 카드</span>
            <Badge color={mainColor}>{card.fun_tag}</Badge>
          </div>

          <p className="text-base font-semibold text-[#2F2B3A] leading-snug">
            &ldquo;{card.one_line_summary}&rdquo;
          </p>

          <div className="flex flex-col gap-2 text-sm text-[#4A4460]">
            <div className="flex gap-2 items-start">
              <span className="text-[#9B8FC4] shrink-0">말투</span>
              <span>{card.tone}</span>
            </div>
            <div className="flex gap-2 items-start">
              <span className="text-[#9B8FC4] shrink-0">스타일</span>
              <span>{card.active_style}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {card.keywords.map((kw) => (
              <span
                key={kw}
                className="px-2.5 py-1 rounded-full text-xs font-medium"
                style={{ backgroundColor: `${mainColor}50`, color: '#2F2B3A' }}
              >
                {kw}
              </span>
            ))}
          </div>

          {isMe && canGenerate && (
            <Button variant="secondary" size="sm" onClick={onGenerateCard} disabled={generating}>
              {generating ? '분석 중...' : '카드 다시 생성'}
            </Button>
          )}
        </Card>
      ) : isMe ? (
        <Card className="w-full p-5 flex flex-col items-center gap-3 text-center">
          <p className="text-sm text-[#6B647A]">
            {canGenerate
              ? '글이 충분히 쌓였어요! AI가 캐릭터 카드를 만들어줄게요.'
              : `글을 ${5 - postCount}개 더 쓰면 AI 카드가 생겨요 ✨`}
          </p>
          {canGenerate && (
            <Button onClick={onGenerateCard} disabled={generating}>
              {generating ? '분석 중...' : '캐릭터 카드 생성하기'}
            </Button>
          )}
        </Card>
      ) : (
        <Card className="w-full p-5 text-center">
          <p className="text-sm text-[#6B647A]">아직 카드가 없어요</p>
        </Card>
      )}
    </div>
  )
}
