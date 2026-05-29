# 📋 Board Frontend

Spring Boot REST API 기반 게시판 프로젝트의 프론트엔드입니다.

## 🛠 Tech Stack

- Vue.js 3
- Vue Router
- Pinia (상태 관리)
- Axios
- WebSocket (STOMP + SockJS)
- Vite

## 📌 주요 기능

- 회원가입 / 로그인 (JWT 인증)
- 게시글 CRUD (작성 / 조회 / 수정 / 삭제)
- 본인 게시글만 수정 / 삭제 가능
- 게시글 페이징 (10개씩, 최신순)
- 게시글 조회수 / 댓글 수 표시
- 댓글 / 대댓글 CRUD (무제한 깊이)
- 본인 댓글만 수정 / 삭제 가능
- 실시간 전체 채팅 팝업 (WebSocket)
- 네비게이션 바 및 로그아웃

## 🗂 프로젝트 구조
src/

├── api/            # axios API 호출

│   ├── axios.js    # axios 인스턴스 및 인터셉터

│   ├── auth.js     # 회원가입 / 로그인 API

│   └── post.js     # 게시글 / 댓글 API

├── stores/         # Pinia 상태 관리

│   └── auth.js     # 로그인 상태 / 토큰 관리

├── views/          # 페이지 컴포넌트

│   ├── LoginView.vue

│   ├── SignupView.vue

│   ├── PostListView.vue

│   ├── PostDetailView.vue

│   └── PostFormView.vue

├── components/     # 공통 컴포넌트

│   ├── NavBar.vue

│   ├── CommentItem.vue

│   └── ChatPopup.vue

└── router/         # 라우팅 설정

└── index.js

## 🔗 연관 프로젝트

- 백엔드: [board-api](https://github.com/soso2234/board-api)

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