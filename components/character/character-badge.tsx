import { CharacterColor, CharacterType, CHARACTER_COLOR_HEX } from '@/types'
import { CharacterAvatar } from './character-avatar'

interface CharacterBadgeProps {
  type: CharacterType
  color: CharacterColor
  name: string
  size?: 'sm' | 'md'
}

export function CharacterBadge({ type, color, name, size = 'md' }: CharacterBadgeProps) {
  const avatarSize = size === 'sm' ? 28 : 36

  return (
    <div className="flex items-center gap-2">
      <CharacterAvatar type={type} color={color} size={avatarSize} />
      <span
        className={`font-semibold ${size === 'sm' ? 'text-xs' : 'text-sm'}`}
        style={{ color: '#2F2B3A' }}
      >
        {name}
      </span>
    </div>
  )
}
