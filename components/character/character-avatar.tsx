import { CharacterColor, CharacterType, CHARACTER_COLOR_HEX } from '@/types'

interface CharacterAvatarProps {
  type: CharacterType
  color: CharacterColor
  size?: number
  className?: string
}

function RabbitSVG({ fill, size }: { fill: string; size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="32" cy="38" rx="18" ry="16" fill={fill} />
      <ellipse cx="22" cy="20" rx="6" ry="10" fill={fill} />
      <ellipse cx="42" cy="20" rx="6" ry="10" fill={fill} />
      <ellipse cx="22" cy="19" rx="3" ry="7" fill="#FFD6C9" opacity="0.7" />
      <ellipse cx="42" cy="19" rx="3" ry="7" fill="#FFD6C9" opacity="0.7" />
      <circle cx="26" cy="38" r="3" fill="#2F2B3A" />
      <circle cx="38" cy="38" r="3" fill="#2F2B3A" />
      <circle cx="27.5" cy="36.5" r="1" fill="white" />
      <circle cx="39.5" cy="36.5" r="1" fill="white" />
      <ellipse cx="32" cy="43" rx="4" ry="2" fill="#FFD6C9" opacity="0.8" />
      <path d="M29 44 Q32 47 35 44" stroke="#2F2B3A" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    </svg>
  )
}

function GhostSVG({ fill, size }: { fill: string; size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 36 Q14 16 32 16 Q50 16 50 36 L50 54 L44 50 L38 54 L32 50 L26 54 L20 50 L14 54 Z" fill={fill} />
      <circle cx="26" cy="36" r="3.5" fill="#2F2B3A" />
      <circle cx="38" cy="36" r="3.5" fill="#2F2B3A" />
      <circle cx="27.5" cy="34.5" r="1.2" fill="white" />
      <circle cx="39.5" cy="34.5" r="1.2" fill="white" />
      <path d="M28 43 Q32 46 36 43" stroke="#2F2B3A" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    </svg>
  )
}

function CatSVG({ fill, size }: { fill: string; size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polygon points="18,28 14,14 26,22" fill={fill} />
      <polygon points="46,28 50,14 38,22" fill={fill} />
      <ellipse cx="32" cy="38" rx="20" ry="17" fill={fill} />
      <circle cx="26" cy="37" r="3.5" fill="#2F2B3A" />
      <circle cx="38" cy="37" r="3.5" fill="#2F2B3A" />
      <circle cx="27.5" cy="35.5" r="1.2" fill="white" />
      <circle cx="39.5" cy="35.5" r="1.2" fill="white" />
      <ellipse cx="32" cy="42" rx="3" ry="2" fill="#FFD6C9" opacity="0.9" />
      <line x1="20" y1="42" x2="12" y2="40" stroke="#2F2B3A" strokeWidth="1" strokeLinecap="round" />
      <line x1="20" y1="44" x2="12" y2="44" stroke="#2F2B3A" strokeWidth="1" strokeLinecap="round" />
      <line x1="44" y1="42" x2="52" y2="40" stroke="#2F2B3A" strokeWidth="1" strokeLinecap="round" />
      <line x1="44" y1="44" x2="52" y2="44" stroke="#2F2B3A" strokeWidth="1" strokeLinecap="round" />
    </svg>
  )
}

function SlimeSVG({ fill, size }: { fill: string; size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 42 Q12 22 32 18 Q52 22 52 42 Q52 56 32 56 Q12 56 12 42 Z" fill={fill} />
      <path d="M22 18 Q24 10 28 16" fill={fill} />
      <path d="M36 17 Q40 8 42 16" fill={fill} />
      <ellipse cx="22" cy="16" rx="4" ry="6" fill={fill} />
      <ellipse cx="40" cy="15" rx="4" ry="6" fill={fill} />
      <circle cx="26" cy="40" r="4" fill="#2F2B3A" />
      <circle cx="38" cy="40" r="4" fill="#2F2B3A" />
      <circle cx="27.5" cy="38.5" r="1.5" fill="white" />
      <circle cx="39.5" cy="38.5" r="1.5" fill="white" />
      <path d="M28 47 Q32 51 36 47" stroke="#2F2B3A" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    </svg>
  )
}

function RobotSVG({ fill, size }: { fill: string; size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="14" y="26" width="36" height="30" rx="6" fill={fill} />
      <rect x="20" y="14" width="24" height="14" rx="4" fill={fill} />
      <line x1="32" y1="14" x2="32" y2="10" stroke="#2F2B3A" strokeWidth="2" strokeLinecap="round" />
      <circle cx="32" cy="9" r="2" fill="#2F2B3A" />
      <rect x="22" y="32" width="8" height="8" rx="2" fill="#2F2B3A" />
      <rect x="34" y="32" width="8" height="8" rx="2" fill="#2F2B3A" />
      <rect cx="27.5" cy="34.5" width="3" height="3" rx="1" fill="white" x="24.5" y="33.5" />
      <rect cx="39.5" cy="34.5" width="3" height="3" rx="1" fill="white" x="36.5" y="33.5" />
      <rect x="24" y="46" width="16" height="4" rx="2" fill="#2F2B3A" opacity="0.3" />
      <rect x="8" y="30" width="6" height="12" rx="3" fill={fill} />
      <rect x="50" y="30" width="6" height="12" rx="3" fill={fill} />
    </svg>
  )
}

function BearSVG({ fill, size }: { fill: string; size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="18" cy="24" r="8" fill={fill} />
      <circle cx="46" cy="24" r="8" fill={fill} />
      <circle cx="18" cy="24" r="5" fill={fill} opacity="0.7" />
      <circle cx="46" cy="24" r="5" fill={fill} opacity="0.7" />
      <ellipse cx="32" cy="40" rx="20" ry="17" fill={fill} />
      <circle cx="26" cy="38" r="3.5" fill="#2F2B3A" />
      <circle cx="38" cy="38" r="3.5" fill="#2F2B3A" />
      <circle cx="27.5" cy="36.5" r="1.2" fill="white" />
      <circle cx="39.5" cy="36.5" r="1.2" fill="white" />
      <ellipse cx="32" cy="45" rx="6" ry="4" fill="#FFD6C9" opacity="0.8" />
      <path d="M29 46 Q32 49 35 46" stroke="#2F2B3A" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    </svg>
  )
}

const SVG_MAP: Record<CharacterType, React.ComponentType<{ fill: string; size: number }>> = {
  rabbit: RabbitSVG,
  ghost: GhostSVG,
  cat: CatSVG,
  slime: SlimeSVG,
  robot: RobotSVG,
  bear: BearSVG,
}

export function CharacterAvatar({ type, color, size = 64, className = '' }: CharacterAvatarProps) {
  const fill = CHARACTER_COLOR_HEX[color]
  const AvatarSVG = SVG_MAP[type]

  return (
    <div
      className={`inline-flex items-center justify-center rounded-full ${className}`}
      style={{
        width: size + 8,
        height: size + 8,
        backgroundColor: `${fill}40`,
      }}
    >
      <AvatarSVG fill={fill} size={size} />
    </div>
  )
}
