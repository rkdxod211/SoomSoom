import OpenAI from 'openai'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

interface CharacterCardResult {
  one_line_summary: string
  keywords: string[]
  tone: string
  active_style: string
  fun_tag: string
}

export async function generateCharacterCard(posts: string[]): Promise<CharacterCardResult> {
  const postText = posts.map((p, i) => `${i + 1}. ${p}`).join('\n')

  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'system',
        content: `You are generating a playful character card for an anonymous SNS avatar (Korean service called 숨숨).

Input: several short posts written by the same anonymous character.

Your job:
- Summarize the character's vibe in a cute, light, non-judgmental way
- Do not infer gender, age, ethnicity, diagnosis, occupation, school, or any sensitive traits
- Keep the tone playful, soft, and social-app friendly (like a fun personality quiz)
- Write everything in Korean
- Return valid JSON only, no markdown

Return this JSON format exactly:
{
  "one_line_summary": "한 줄 요약 (귀엽고 가볍게)",
  "keywords": ["자주 쓰는 단어나 표현 3개"],
  "tone": "말투 분위기 (짧게)",
  "active_style": "활동 스타일 (짧게)",
  "fun_tag": "재미있는 태그 하나"
}`,
      },
      {
        role: 'user',
        content: `다음은 이 캐릭터가 쓴 글들이야:\n\n${postText}`,
      },
    ],
    temperature: 0.8,
    max_tokens: 300,
  })

  const raw = response.choices[0].message.content ?? '{}'
  return JSON.parse(raw) as CharacterCardResult
}
