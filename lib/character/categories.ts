export type CategoryId =
  | 'daily' | 'love' | 'idol' | 'anime' | 'hobby'
  | 'vent' | 'food' | 'study' | 'work' | 'pet' | 'music'

export interface Category {
  id: CategoryId
  label: string
  emoji: string
  keywords: string[]
}

export const CATEGORIES: Category[] = [
  { id: 'daily', label: '일상', emoji: '🌿', keywords: ['오늘', '날씨', '집', '밥', '커피', '산책', '일어났', '아침', '저녁', '하루'] },
  { id: 'love', label: '연애', emoji: '💕', keywords: ['설레', '보고싶', '썸', '좋아해', '남친', '여친', '짝사랑', '연애', '고백'] },
  { id: 'idol', label: '아이돌', emoji: '✨', keywords: ['컴백', '직캠', '팬싸', '콘서트', '덕질', '최애', '입덕', '아이돌', '팬미팅', '뮤비'] },
  { id: 'anime', label: '애니', emoji: '🎌', keywords: ['애니', '망가', '성우', '오타쿠', '작화', '신카이', '원피스', '나루토', '귀멸', '주술'] },
  { id: 'hobby', label: '취미', emoji: '🎮', keywords: ['게임', '영화', '드라마', '운동', '책', '유튜브', '넷플', '독서', '헬스', '수영'] },
  { id: 'vent', label: '하소연', emoji: '😤', keywords: ['짜증', '힘들어', '스트레스', '열받', '미치겠', '왜이래', '싫어', '힘드', '지쳐'] },
  { id: 'food', label: '먹방', emoji: '🍜', keywords: ['맛있', '배고파', '치킨', '먹고싶', '식당', '카페', '먹었', '맛집', '라면', '떡볶이'] },
  { id: 'study', label: '공부/시험', emoji: '📚', keywords: ['공부', '시험', '과제', '수능', '도서관', '공시', '학원', '성적', '강의'] },
  { id: 'work', label: '직장/학교', emoji: '💻', keywords: ['출근', '회사', '학교', '알바', '교수', '수업', '야근', '상사', '취업'] },
  { id: 'pet', label: '동물', emoji: '🐾', keywords: ['강아지', '고양이', '반려동물', '펫', '냥이', '댕댕', '고양', '강아'] },
  { id: 'music', label: '음악', emoji: '🎵', keywords: ['노래', '플리', '멜론', '스포티파이', '음악', '앨범', '가사', '신곡', '듣고'] },
]

export function detectCategories(posts: string[]): CategoryId[] {
  const text = posts.join(' ')
  const scores: Record<CategoryId, number> = {} as any

  for (const cat of CATEGORIES) {
    scores[cat.id] = cat.keywords.filter((kw) => text.includes(kw)).length
  }

  return CATEGORIES
    .filter((cat) => scores[cat.id] >= 2)
    .sort((a, b) => scores[b.id] - scores[a.id])
    .slice(0, 3)
    .map((cat) => cat.id)
}

export function getCategoryById(id: CategoryId): Category {
  return CATEGORIES.find((c) => c.id === id) ?? CATEGORIES[0]
}
