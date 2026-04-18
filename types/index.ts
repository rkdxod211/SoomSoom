export type CharacterType = 'rabbit' | 'ghost' | 'cat' | 'slime' | 'robot' | 'bear'
export type CharacterColor = 'lavender' | 'mint' | 'peach' | 'butter' | 'sky' | 'gray'

export interface User {
  id: string
  created_at: string
  character_type: CharacterType
  character_color: CharacterColor
  character_seed: string
  character_name: string
  onboarded: boolean
}

export interface Post {
  id: string
  user_id: string
  content: string
  created_at: string
  deleted_at: string | null
  author?: User
  reactions?: ReactionSummary[]
  reply_count?: number
}

export interface Reaction {
  id: string
  post_id: string
  user_id: string
  reaction_type: ReactionType
  created_at: string
}

export type ReactionType = 'laugh' | 'empathy' | 'what' | 'omg' | 'cute'

export interface ReactionSummary {
  reaction_type: ReactionType
  count: number
  reacted_by_me: boolean
}

export interface Reply {
  id: string
  post_id: string
  user_id: string
  content: string
  created_at: string
  deleted_at: string | null
  author?: User
}

export interface CharacterCard {
  id: string
  user_id: string
  one_line_summary: string
  keywords: string[]
  tone: string
  active_style: string
  fun_tag: string
  generated_from_count: number
  updated_at: string
}

export const REACTION_EMOJI: Record<ReactionType, { emoji: string; label: string }> = {
  laugh: { emoji: 'ㅋㅋ', label: '웃김' },
  empathy: { emoji: '공감', label: '공감' },
  what: { emoji: '뭐임', label: '뭐임' },
  omg: { emoji: '헐', label: '헐' },
  cute: { emoji: '귀여움', label: '귀여움' },
}

export const CHARACTER_TYPES: CharacterType[] = ['rabbit', 'ghost', 'cat', 'slime', 'robot', 'bear']
export const CHARACTER_COLORS: CharacterColor[] = ['lavender', 'mint', 'peach', 'butter', 'sky', 'gray']

export const CHARACTER_TYPE_KO: Record<CharacterType, string> = {
  rabbit: '토끼',
  ghost: '유령',
  cat: '고양이',
  slime: '슬라임',
  robot: '로봇',
  bear: '곰',
}

export const CHARACTER_COLOR_KO: Record<CharacterColor, string> = {
  lavender: '보라',
  mint: '민트',
  peach: '피치',
  butter: '버터',
  sky: '하늘',
  gray: '회색',
}

export const CHARACTER_COLOR_HEX: Record<CharacterColor, string> = {
  lavender: '#CDBBFF',
  mint: '#B8F2D6',
  peach: '#FFD6C9',
  butter: '#FFE89A',
  sky: '#BFE3FF',
  gray: '#D4D4D4',
}
