import OpenAI from 'openai'

export type CategoryId =
  | 'daily' | 'love' | 'idol' | 'anime' | 'hobby'
  | 'vent' | 'food' | 'study' | 'work' | 'pet' | 'music'

export interface Category {
  id: CategoryId
  label: string
  emoji: string
}

export const CATEGORIES: Category[] = [
  { id: 'daily', label: '일상', emoji: '🌿' },
  { id: 'love', label: '연애', emoji: '💕' },
  { id: 'idol', label: '아이돌', emoji: '✨' },
  { id: 'anime', label: '애니', emoji: '🎌' },
  { id: 'hobby', label: '취미', emoji: '🎮' },
  { id: 'vent', label: '하소연', emoji: '😤' },
  { id: 'food', label: '먹방', emoji: '🍜' },
  { id: 'study', label: '공부/시험', emoji: '📚' },
  { id: 'work', label: '직장/학교', emoji: '💻' },
  { id: 'pet', label: '동물', emoji: '🐾' },
  { id: 'music', label: '음악', emoji: '🎵' },
]

const CATEGORY_DESCRIPTIONS: Record<CategoryId, string> = {
  daily: '일상적인 하루, 날씨, 밥, 산책, 집 등 평범한 이야기',
  love: '연애, 짝사랑, 썸, 설렘, 이별, 보고싶음 등 감정',
  idol: '아이돌 덕질, 팬활동, 콘서트, 최애, 컴백 등',
  anime: '애니메이션, 만화, 망가, 오타쿠 문화',
  hobby: '게임, 영화, 드라마, 운동, 독서, 유튜브 등 취미활동',
  vent: '짜증, 스트레스, 힘듦, 하소연, 푸념',
  food: '맛집, 음식, 배고픔, 먹방, 카페, 요리',
  study: '공부, 시험, 과제, 수능, 학원, 성적',
  work: '직장, 회사, 알바, 학교생활, 출근, 야근',
  pet: '강아지, 고양이, 반려동물, 동물 이야기',
  music: '음악 감상, 플리, 노래, 앨범, 가사',
}

export async function detectCategories(posts: string[]): Promise<CategoryId[]> {
  if (!process.env.OPENAI_API_KEY) return []

  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  const postText = posts.map((p, i) => `${i + 1}. ${p}`).join('\n')
  const categoryList = CATEGORIES.map((c) => `- ${c.id}: ${CATEGORY_DESCRIPTIONS[c.id]}`).join('\n')

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `사용자가 쓴 짧은 글들을 보고, 아래 카테고리 중 해당되는 것들을 골라줘.
비슷한 뉘앙스, 유사 표현, 은어, 줄임말도 포함해서 판단해.
최대 3개까지, 해당되는 게 없으면 빈 배열 반환.

카테고리 목록:
${categoryList}

반드시 JSON 배열만 반환. 예시: ["daily", "food"]`,
        },
        {
          role: 'user',
          content: postText,
        },
      ],
      temperature: 0.3,
      max_tokens: 100,
    })

    const raw = response.choices[0].message.content ?? '[]'
    const parsed = JSON.parse(raw.trim())
    const validIds = CATEGORIES.map((c) => c.id)
    return (parsed as string[]).filter((id) => validIds.includes(id as CategoryId)) as CategoryId[]
  } catch {
    return []
  }
}

export const CATEGORY_KEYWORDS: Record<CategoryId, string[]> = {
  daily: ['오늘', '하루', '날씨', '산책', '집', '아침', '저녁', '점심', '일어', '잠'],
  love: ['연애', '짝사랑', '썸', '설렘', '이별', '보고싶', '좋아', '사귀', '헤어', '고백'],
  idol: ['아이돌', '덕질', '콘서트', '최애', '컴백', '팬', '직캠', '입덕', 'bias'],
  anime: ['애니', '만화', '망가', '오타쿠', '성우', '코스프레', '피규어', '에피소드'],
  hobby: ['게임', '영화', '드라마', '운동', '독서', '유튜브', '취미', '넷플', '롤', '리그'],
  vent: ['짜증', '스트레스', '힘들', '하소연', '푸념', '열받', '미치겠', '싫어', '화나'],
  food: ['맛집', '음식', '배고프', '먹방', '카페', '요리', '밥', '먹', '치킨', '라면'],
  study: ['공부', '시험', '과제', '수능', '학원', '성적', '공시', '모의고사', '문제'],
  work: ['직장', '회사', '알바', '학교', '출근', '야근', '월급', '상사', '수업', '과'],
  pet: ['강아지', '고양이', '반려', '동물', '햄스터', '멍멍', '야옹', '입양'],
  music: ['음악', '플리', '노래', '앨범', '가사', '멜론', '스포티', '듣고', '틀어'],
}

export function getCategoryById(id: CategoryId): Category {
  return CATEGORIES.find((c) => c.id === id) ?? CATEGORIES[0]
}
