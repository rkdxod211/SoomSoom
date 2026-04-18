import { CategoryId } from '@/lib/character/categories'

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
  categories: CategoryId[]
}

export interface Post {
  id: string
  user_id: string
  content: string
  created_at: string
  deleted_at: string | null
  author?: User
  reply_count?: number
  bookmark_count?: number
  is_bookmarked?: boolean
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

export interface Follow {
  follower_id: string
  following_id: string
}

export interface UserProfile extends User {
  follower_count: number
  following_count: number
  is_following: boolean
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
