# 📋 Board Frontend

Claude AI 활용
Spring Boot REST API 기반 게시판 프로젝트의 프론트엔드입니다.

JWT 인증, 실시간 채팅, 댓글/대댓글 등 실무에서 자주 사용하는 기능을 구현했습니다.

## 🔗 연관 프로젝트
- 백엔드: [board-api](https://github.com/soso2234/board-api)

---

## 🛠 Tech Stack

| 기술 | 버전 | 선택 이유 |
|------|------|-----------|
| Vue.js | 3 | Composition API로 재사용성 높은 컴포넌트 구성 |
| Vue Router | 4 | SPA 라우팅 및 네비게이션 가드로 인증 처리 |
| Pinia | - | Vuex보다 가볍고 Vue 3에 최적화된 상태 관리 |
| Axios | - | HTTP 인터셉터로 JWT 토큰 자동 첨부 |
| WebSocket (STOMP + SockJS) | - | 실시간 채팅 양방향 통신 |
| Vite | - | 빠른 개발 서버 및 빌드 도구 |

---

## 📌 주요 기능

### 회원
- 회원가입 / 로그인
- JWT 토큰 localStorage 저장 및 자동 갱신
- 로그아웃 시 토큰 삭제
- 네비게이션 가드로 미인증 사용자 접근 차단

### 게시글
- CRUD (작성 / 조회 / 수정 / 삭제)
- 본인 게시글만 수정 / 삭제 버튼 표시
- 페이징 처리 (10개씩, 최신순)
- 조회수 / 댓글 수 목록에 표시

### 댓글 / 대댓글
- 무제한 깊이 대댓글 재귀 컴포넌트 구현
- 본인 댓글만 수정 / 삭제 버튼 표시
- 인라인 수정 모드 (수정 완료 / 취소)

### 실시간 채팅
- 우측 하단 팝업 형태 채팅창
- 입장 / 퇴장 시스템 메시지 표시
- 내 메시지 / 상대 메시지 말풍선 UI 구분
- 이전 채팅 기록 50개 자동 로드

---

## 🗂 프로젝트 구조

src/

├── api/

│   ├── axios.js        # axios 인스턴스 및 인터셉터 (토큰 자동 첨부, 401 처리)

│   ├── auth.js         # 회원가입 / 로그인 API

│   └── post.js         # 게시글 / 댓글 API

├── stores/

│   └── auth.js         # 로그인 상태 / 토큰 관리 (Pinia)

├── views/

│   ├── LoginView.vue       # 로그인 페이지

│   ├── SignupView.vue      # 회원가입 페이지

│   ├── PostListView.vue    # 게시글 목록 + 페이징

│   ├── PostDetailView.vue  # 게시글 상세 + 댓글

│   └── PostFormView.vue    # 게시글 작성 / 수정 (공용)

├── components/

│   ├── NavBar.vue          # 상단 네비게이션 바

│   ├── CommentItem.vue     # 재귀 댓글 컴포넌트

│   └── ChatPopup.vue       # 실시간 채팅 팝업

└── router/

└── index.js            # 라우팅 설정 + 네비게이션 가드

---

## 🔥 트러블슈팅

### 1. SockJS `global is not defined` 오류
- **문제**: Vite 환경에서 `sockjs-client` 사용 시 `global is not defined` 오류
- **원인**: `sockjs-client`가 Node.js 환경 기준으로 작성되어 브라우저의 `global` 변수를 찾지 못함
- **해결**: `vite.config.js`에 `define: { global: 'globalThis' }` 추가

### 2. Vue DevTools가 화면을 가리는 문제
- **문제**: 개발 중 Vue DevTools 패널이 화면 전체를 덮어 UI 확인 불가
- **원인**: `vite-plugin-vue-devtools` 플러그인 자동 활성화
- **해결**: `vite.config.js`에서 `vueDevTools()` 플러그인 제거

### 3. 공통 button 스타일이 댓글 버튼에 적용되는 문제
- **문제**: 전역 `button` CSS가 댓글 답글/삭제 버튼에도 적용되어 버튼이 크게 표시됨
- **원인**: 전역 스타일에 `button` 태그 셀렉터 사용
- **해결**: 로그인/회원가입 버튼을 `.btn-primary` 클래스로 분리하고 나머지 버튼에 개별 스타일 적용

---

## ⚙️ 실행 방법

### 사전 준비
백엔드 서버가 `http://localhost:8080`에서 실행 중이어야 합니다.

### 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

개발 서버: `http://localhost:5173`

---

## 📸 화면 구성

| 페이지 | 설명 |
|--------|------|
| 로그인 | JWT 토큰 발급 및 저장 |
| 회원가입 | 아이디 중복 검사 |
| 게시글 목록 | 페이징, 조회수, 댓글 수 표시 |
| 게시글 상세 | 조회수 증가, 댓글/대댓글 |
| 게시글 작성/수정 | 로그인 사용자 자동 입력 |
| 채팅 팝업 | 우측 하단 실시간 채팅 |