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

export const CATEGORY_DESCRIPTIONS: Record<CategoryId, string> = {
  daily: '일상적인 하루, 날씨, 밥, 산책, 집 등 평범한 이야기. "오늘 진짜 피곤하다", "날씨 좋다", "집에 가고 싶어" 같은 류',
  love: '연애, 짝사랑, 썸, 설렘, 이별, 보고싶음 등 감정. "심쿵", "두근거려", "연락 안 옴", "차였어", "보고싶다" 같은 류',
  idol: '아이돌 덕질, 팬활동, 콘서트, 최애, 컴백 등. "직캠", "입덕", "최애", "컴백", "티켓팅" 같은 류',
  anime: '애니메이션, 만화, 망가, 오타쿠 문화. "정주행", "애니 추천", "성우", "OST", "피규어" 같은 류',
  hobby: '게임, 영화, 드라마, 운동, 독서, 유튜브 등 취미활동. "롤", "넷플", "헬스", "책 읽었어", "유튜브 봤어" 같은 류',
  vent: '짜증, 스트레스, 힘듦, 하소연, 푸념. "열받아", "미치겠다", "진짜 싫어", "왜 이래", "힘들어 죽겠어" 같은 류',
  food: '맛집, 음식, 배고픔, 먹방, 카페, 요리. "맛있겠다", "배고파", "뭐 먹지", "카페 갔어", "치킨" 같은 류',
  study: '공부, 시험, 과제, 수능, 학원, 성적. "벼락치기", "시험 망했어", "과제 많다", "공부하기 싫어" 같은 류',
  work: '직장, 회사, 알바, 학교생활, 출근, 야근. "야근", "상사 짜증", "월급날", "수업 지루해", "알바 힘들어" 같은 류',
  pet: '강아지, 고양이, 반려동물, 동물 이야기. "우리 강아지", "고양이 사진", "반려동물", "귀여워" 같은 류',
  music: '음악 감상, 플리, 노래, 앨범, 가사. "노래 추천", "이 노래 좋다", "멜론", "플리 짜줘", "가사 공감" 같은 류',
}

export const CATEGORY_KEYWORDS: Record<CategoryId, string[]> = {
  daily: [
    '오늘', '하루', '날씨', '산책', '집', '아침', '저녁', '점심', '일어', '잠', '피곤', '일상',
    '어제', '내일', '요즘', '그냥', '생각', '느낌', '기분', '심심', '심심함', '여유', '쉬는',
  ],
  love: [
    '연애', '짝사랑', '썸', '설렘', '이별', '보고싶', '좋아', '사귀', '헤어', '고백', '심쿵',
    '두근', '연락', '카톡', '문자', '답장', '차였', '차여', '솔로', '커플', '데이트', '남친',
    '여친', '남자친구', '여자친구', '그사람', '그분', '첫사랑', '설레',
  ],
  idol: [
    '아이돌', '덕질', '콘서트', '최애', '컴백', '팬', '직캠', '입덕', '덕후', '티켓팅', '포토카드',
    '팬미팅', '쇼케이스', '음방', '무대', '뮤비', '데뷔', '앨범', '아이유', '방탄', 'bts', 'kpop',
    '오마이걸', '에스파', 'aespa', 'stray kids', '스트레이키즈',
  ],
  anime: [
    '애니', '만화', '망가', '오타쿠', '성우', '코스프레', '피규어', '정주행', '에피소드', '시즌',
    '원피스', '나루토', '귀멸', '진격', '주술', '이세계', '모에', '와이후', '오시', '덕심',
    '애니추천', 'ost', '애니송',
  ],
  hobby: [
    '게임', '영화', '드라마', '운동', '독서', '유튜브', '취미', '넷플', '롤', '리그', '오버워치',
    '마인크래프트', '스팀', '헬스', '러닝', '자전거', '등산', '책', '소설', '웹툰', '웹소설',
    '넷플릭스', '왓챠', '시리즈', '극장', '영화관',
  ],
  vent: [
    '짜증', '스트레스', '힘들', '하소연', '푸념', '열받', '미치겠', '싫어', '화나', '억울',
    '왜 이래', '진짜', '어이없', '황당', '개빡', '빡침', '한숨', '지쳐', '지침', '못 살겠',
    '미칠 것 같', '토나', '환장', '울고 싶', '하기 싫', '귀찮',
  ],
  food: [
    '맛집', '음식', '배고프', '먹방', '카페', '요리', '밥', '먹', '치킨', '라면', '피자', '떡볶이',
    '삼겹살', '초밥', '파스타', '커피', '디저트', '케이크', '빵', '맛있', '먹고 싶', '뭐 먹',
    '점심 뭐', '저녁 뭐', '배터지게', '흡입', '냉털',
  ],
  study: [
    '공부', '시험', '과제', '수능', '학원', '성적', '공시', '모의고사', '문제', '벼락치기', '족보',
    '중간고사', '기말고사', '레포트', '논문', '발표', '공부하기', '집중', '도서관', '독서실',
    '암기', '복습', '예습', '오답', '틀렸', '만점', '망했',
  ],
  work: [
    '직장', '회사', '알바', '학교', '출근', '야근', '월급', '상사', '수업', '과', '직장인',
    '출근하기', '퇴근', '월요일', '금요일', '주말', '휴가', '연차', '회의', '보고서', '업무',
    '선생님', '교수님', '과제', '학기', '수강',
  ],
  pet: [
    '강아지', '고양이', '반려', '동물', '햄스터', '멍멍', '야옹', '입양', '분양', '털', '발바닥',
    '귀여워', '우리 애', '집사', '견주', '산책', '동물병원', '사료', '간식', '냥이', '댕댕',
  ],
  music: [
    '음악', '플리', '노래', '앨범', '가사', '멜론', '스포티', '듣고', '틀어', '추천', '플레이리스트',
    '이 노래', '공감', 'bgm', '유튜브 뮤직', '애플뮤직', '사운드클라우드', '띵곡', '명곡', '중독',
    '노래 추천', '장르', '발라드', '힙합', '재즈', '팝', 'ost',
  ],
}

const SYSTEM_PROMPT_BATCH = `사용자가 쓴 짧은 글들을 보고, 아래 카테고리 중 해당되는 것들을 골라줘.
비슷한 뉘앙스, 유사 표현, 은어, 줄임말, connotation까지 포함해서 판단해.
최대 3개, 해당 없으면 빈 배열.

카테고리:
`

const SYSTEM_PROMPT_SINGLE = `짧은 글 하나를 보고 아래 카테고리 중 가장 잘 맞는 것 하나만 골라줘.
비슷한 뉘앙스, 유사 표현, 은어, 줄임말, connotation까지 포함해서 판단해.
해당 없으면 "daily".

카테고리:
`

function buildCategoryList() {
  return CATEGORIES.map((c) => `- ${c.id}: ${CATEGORY_DESCRIPTIONS[c.id]}`).join('\n')
}

export async function detectCategories(posts: string[]): Promise<CategoryId[]> {
  if (!process.env.OPENAI_API_KEY) return []

  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  const postText = posts.map((p, i) => `${i + 1}. ${p}`).join('\n')

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: SYSTEM_PROMPT_BATCH + buildCategoryList() + '\n\n반드시 JSON 배열만 반환. 예시: ["daily", "food"]',
        },
        { role: 'user', content: postText },
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

export async function detectPostCategory(content: string): Promise<CategoryId | null> {
  if (!process.env.OPENAI_API_KEY) return null

  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: SYSTEM_PROMPT_SINGLE + buildCategoryList() + '\n\n카테고리 id 하나만 반환. 예: "food"',
        },
        { role: 'user', content },
      ],
      temperature: 0.2,
      max_tokens: 20,
    })

    const raw = response.choices[0].message.content?.trim().replace(/"/g, '') ?? 'daily'
    const validIds = CATEGORIES.map((c) => c.id)
    return validIds.includes(raw as CategoryId) ? (raw as CategoryId) : 'daily'
  } catch {
    return null
  }
}

export function getCategoryById(id: CategoryId): Category {
  return CATEGORIES.find((c) => c.id === id) ?? CATEGORIES[0]
}
