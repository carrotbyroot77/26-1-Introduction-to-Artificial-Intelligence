# AI Strange Museum Generator

AI Strange Museum Generator는 대학 과제용 에이전틱 AI 실습 프로젝트입니다. 사용자가 2~3개의 키워드와 분위기를 입력하면, AI가 가상의 박물관 전시를 기획하고 디지털 전시 페이지 형태로 결과를 보여줍니다.

## 프로젝트 개요

이 프로젝트는 단순한 챗봇 응답이 아니라, 하나의 창작 팀이 함께 일하는 것처럼 보이도록 설계되었습니다. 사용자는 몇 개의 키워드만 입력하지만, 시스템은 이를 바탕으로 박물관 이름, 전시 요약, 전시 컨셉, 작품 목록, 큐레이터 코멘트, 슬로건까지 한 번에 생성합니다.

초기 화면에는 샘플 전시 결과가 먼저 보여서 발표나 시연 시에도 바로 화면 구성이 살아 있습니다. `OPENAI_API_KEY`가 없는 경우에도 자동으로 데모 모드로 동작합니다.

## 왜 에이전틱 AI 프로젝트인가?

이 앱은 모델을 하나의 역할이 아니라 여러 역할이 협업하는 창작 팀으로 프레이밍합니다.

- `Interpreter`: 입력 키워드 사이의 감정적, 상징적, 개념적 연결을 해석
- `Curator`: 박물관 제목과 전시 컨셉 결정
- `Exhibit Designer`: 3~5개의 전시 작품 구성
- `Publicist`: 큐레이터 노트와 포스터용 슬로건 작성

이 역할 분리는 결과를 더 설득력 있고 전시 기획서처럼 보이게 만들어 주며, 수업에서 “왜 agentic한가?”를 설명하기도 쉽습니다.

## 주요 기능

- React + Vite 기반 프론트엔드
- Node.js + Express 기반 백엔드
- OpenAI 공식 JavaScript SDK를 백엔드에서만 사용
- 키워드 2~3개와 분위기 선택으로 가상 박물관 전시 생성
- 결과를 구조화된 JSON 형태로 요청하고 안전하게 파싱
- API 키가 없을 때 자동 데모 모드 지원
- 첫 화면에 샘플 전시 결과 표시
- 결과 복사 버튼, 다시 생성 버튼, 로딩 상태, 에러 메시지 제공
- 모바일/데스크톱 반응형 UI
- Vercel 또는 Render 배포를 고려한 구조

## 기술 스택

- Frontend: React, Vite
- Backend: Node.js, Express
- Styling: Custom CSS
- AI Integration: OpenAI JavaScript SDK

## 폴더 구조

```text
ai-strange-museum-generator/
  frontend/
    src/
      components/
        DemoBadge.jsx
        ExhibitCard.jsx
        Hero.jsx
        HowItWorks.jsx
        KeywordForm.jsx
        MuseumResult.jsx
      data/
        sampleMuseums.js
      utils/
        copyToClipboard.js
      App.jsx
      index.css
      main.jsx
    index.html
    package.json
    vite.config.js
  backend/
    src/
      routes/
        museumRoutes.js
      services/
        openaiService.js
      utils/
        demoMuseum.js
        safeParseModelOutput.js
        validateInput.js
      server.js
    package.json
  .env.example
  package.json
  README.md
  vercel.json
```

## 동작 방식

1. 사용자가 키워드 2~3개와 분위기를 입력합니다.
2. 프론트엔드가 `/api/generate-museum` 으로 POST 요청을 보냅니다.
3. 백엔드가 입력값을 검증합니다.
4. `OPENAI_API_KEY`가 있으면 OpenAI API를 호출합니다.
5. API 키가 없으면 내부 데모 JSON 데이터를 반환합니다.
6. 프론트엔드는 결과를 디지털 전시 페이지처럼 렌더링합니다.

## 환경 변수

루트의 `.env.example` 파일에는 다음 예시가 포함되어 있습니다.

```env
OPENAI_API_KEY=
VITE_API_BASE_URL=
```

실제로는 `backend/.env` 파일을 만들어 아래처럼 설정하면 됩니다.

```env
OPENAI_API_KEY=your_openai_api_key_here
```

프론트엔드와 백엔드를 서로 다른 도메인에 배포하는 경우에는 프론트엔드 환경 변수도 추가할 수 있습니다.

```env
VITE_API_BASE_URL=https://your-backend-url.example.com
```

주의:

- API 키는 `backend/.env`에만 넣습니다.
- 프론트엔드 코드에 API 키를 넣으면 안 됩니다.
- `.env` 파일은 GitHub에 커밋하지 않는 것이 안전합니다.

## 로컬 실행 방법

### 1. 저장소 클론

```bash
git clone https://github.com/your-username/your-repo.git
cd ai-strange-museum-generator
```

### 2. 의존성 설치

프론트엔드:

```bash
cd frontend
npm install
```

백엔드:

```bash
cd ../backend
npm install
```

### 3. 백엔드 실행

프로젝트 루트에서:

```bash
npm run dev:backend
```

백엔드 주소:

```text
http://localhost:4000
```

### 4. 프론트엔드 실행

다른 터미널에서 프로젝트 루트로 돌아와:

```bash
npm run dev:frontend
```

프론트엔드 주소:

```text
http://localhost:5173
```

### 5. 상태 확인

아래 주소에서 백엔드 상태를 확인할 수 있습니다.

```text
http://localhost:4000/api/health
```

응답 예시:

```json
{
  "ok": true,
  "demoMode": true
}
```

`demoMode: true` 이면 API 키 없이 데모 모드로 동작 중이라는 뜻입니다.

## API 명세

### POST `/api/generate-museum`

요청 body:

```json
{
  "keywords": ["우산", "외로움", "벌레"],
  "mood": "dreamy"
}
```

성공 응답:

```json
{
  "museum": {
    "museumName": "string",
    "summary": "string",
    "concept": "string",
    "interpretedTheme": "string",
    "emotionalTone": "string",
    "curatorialDirection": "string",
    "exhibits": [
      {
        "title": "string",
        "description": "string"
      }
    ],
    "curatorComment": "string",
    "slogan": "string"
  },
  "demoMode": false
}
```

## 프롬프트 설계

백엔드의 OpenAI 서비스는 모델에게 다음 역할을 수행하도록 지시합니다.

- 입력 키워드의 상징적 의미 해석
- 전시 전체를 관통하는 테마 설정
- 박물관 제목과 전시 컨셉 설계
- 3~5개의 연결된 전시 작품 생성
- 큐레이터 코멘트와 슬로건 작성
- JSON만 반환
- 결과 문장은 한국어로 작성

또한 JSON Schema를 지정하고, 모델 출력이 비정상적일 경우에는 안전 파싱 및 데모 데이터 fallback을 사용합니다.

## 예시 입력 / 출력

### 예시 입력

- 키워드: `우산`, `외로움`, `벌레`
- 분위기: `dreamy`

### 예시 출력

- 박물관 이름: `부드러운 잡음의 박물관`
- 요약: `잊힌 사물들이 저마다의 날씨를 웅얼거리는 몽환적인 전시.`
- 슬로건: `비가 당신을 기억하는 곳.`

## 배포 가이드

### Render

프론트엔드와 백엔드를 분리해서 배포하는 방식이 가장 단순합니다.

1. Backend Web Service

- Root Directory: `backend`
- Build Command: `npm install`
- Start Command: `npm start`
- Environment Variable: `OPENAI_API_KEY`

2. Frontend Static Site

- Root Directory: `frontend`
- Build Command: `npm install && npm run build`
- Publish Directory: `dist`
- Optional Environment Variable: `VITE_API_BASE_URL=https://your-backend-url.example.com`

### Vercel

루트에 `vercel.json` 예시 파일이 포함되어 있습니다.

권장 방식:

- 프론트엔드는 Vite 정적 사이트로 배포
- 백엔드는 Node API 또는 서버리스 핸들러로 배포
- 환경 변수에 `OPENAI_API_KEY` 추가

## npm 스크립트

루트 기준:

- `npm run dev:frontend`
- `npm run dev:backend`
- `npm run build:frontend`
- `npm run start:backend`

## 스크린샷 자리

배포 후 아래 경로에 스크린샷을 추가하면 README를 더 보기 좋게 만들 수 있습니다.

- `docs/screenshot-home.png`
- `docs/screenshot-result.png`
- `docs/screenshot-mobile.png`

## 공개 URL 자리

```text
https://your-public-demo-url.example.com
```

## GitHub 저장소 URL 자리

```text
https://github.com/your-username/your-repo
```

## 수업 발표용 포인트

- API 키가 없어도 데모 모드로 바로 시연 가능
- “여러 역할을 가진 AI 팀”이라는 설명이 에이전틱 개념 전달에 유리
- 프론트엔드와 백엔드 구조가 분리되어 있어 설명하기 쉬움
- OpenAI 호출, 검증, 파싱, fallback이 파일별로 나뉘어 있어 발표 자료 만들기 좋음
