# 숨숨 (SoomSoom)

> 정체는 숨기고, 캐릭터로만 솔직해지는 SNS

## 개요

실명·닉네임·자기 브랜딩 없이, **랜덤 캐릭터 하나**로 짧은 글을 올리는 캐릭터 기반 익명 SNS입니다.  
글이 쌓이면 AI가 그 캐릭터의 성격을 분석해 **캐릭터 카드**를 생성해줍니다.

## 기술 스택

- **Frontend**: Next.js 16 App Router + TypeScript + Tailwind CSS
- **Backend**: Next.js API Routes + Supabase (Auth + Postgres + RLS)
- **AI**: OpenAI GPT-4o-mini (캐릭터 카드 생성)
- **배포**: Vercel + Supabase

## 시작하기

### 1. 환경변수 설정

```bash
cp .env.example .env.local
```

`.env.local`에 Supabase와 OpenAI 키를 입력합니다.

### 2. Supabase 설정

Supabase 프로젝트를 생성하고 SQL Editor에서 다음 순서로 실행:

```
supabase/schema.sql  →  supabase/rls.sql
```

### 3. 개발 서버 실행

```bash
npm install
npm run dev
```

`http://localhost:3000`에서 확인합니다.

## 핵심 기능

| 기능 | 설명 |
|------|------|
| 랜덤 캐릭터 부여 | 가입 즉시 고정 캐릭터 1개 배정 |
| 짧은 글 (120자) | 부담 없는 포스트 |
| 리액션 | ㅋㅋ / 공감 / 뭐임 / 헐 / 귀여움 |
| 답글 | 80자 이내 짧은 답글 |
| AI 캐릭터 카드 | 글 5개 이상 → GPT가 성격 분석 |

## 캐릭터 시스템

- **타입**: rabbit / ghost / cat / slime / robot / bear
- **컬러**: lavender / mint / peach / butter / sky / gray
- **이름**: `{색깔} {타입}` (예: 보라 유령, 민트 토끼)

## 페이지 구조

```
/                      랜딩
/login                 이메일 Magic Link 로그인
/onboarding            캐릭터 배정
/feed                  메인 피드
/write                 글 작성
/post/[id]             포스트 상세 + 답글
/me                    내 캐릭터 카드
/character/[userId]    다른 캐릭터 보기
```

## 디자인 시스템

| 색상 | HEX |
|------|-----|
| Lavender | `#CDBBFF` |
| Mint | `#B8F2D6` |
| Peach | `#FFD6C9` |
| Butter | `#FFE89A` |
| Sky | `#BFE3FF` |
| Cream (배경) | `#FFFDF8` |
| Ink (텍스트) | `#2F2B3A` |

## 배포 (Vercel)

환경변수를 Vercel 대시보드에 설정하고 `git push`하면 자동 배포됩니다.
