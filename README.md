# Hanaro Tech Blog

Hanaro Tech Blog는 웹 개발자들을 위한 기술 블로그 플랫폼입니다.

실무에서 쌓은 개발 경험과 최신 웹 기술 트렌드, 노하우를 공유할 수 있는 공간으로,
개발자 커뮤니티의 성장과 지식 확산을 목표로 설계되었습니다.

## 주요 기능

### 👤 사용자 기능

- **회원가입 및 로그인**
  - 이메일 기반 회원가입: 이름, 이메일, 비밀번호 입력 및 중복 검사
  - 비밀번호는 `bcrypt`로 해시 후 저장
  - Google, GitHub 소셜 로그인 지원 (OAuth Provider)
  - Credentials Provider 기반 로그인: `zod`를 활용한 유효성 검증 및 비밀번호 인증
  - 세션 관리: `SessionProvider`, `getSession`, `updateSession`으로 클라이언트/서버 양방향 세션 처리
  - 사용자 역할(Role) 정보를 포함한 `next-auth.d.ts` 타입 확장
- **게시글 탐색 및 검색**
  - 전체 게시글 및 카테고리별 게시글 목록 조회 (`/categories`, `/categories/[id]`)
  - 제목 및 내용 기반 검색 기능 (`searchParams.q`)
  - 실시간 키워드 반영으로 검색 결과 동적 렌더링
- **게시글 반응 시스템 (좋아요/싫어요)**
  - 로그인한 유저는 게시글에 한 번만 반응 가능 (`LIKE` / `DISLIKE`)
  - 같은 반응을 다시 클릭하면 취소, 다른 반응 클릭 시 상태 전환
  - 게시글 목록과 상세 페이지에 반응 수 출력
  - 비로그인 사용자는 `/login`으로 리다이렉트
  - DB 모델: `BoardReaction` 모델 및 `@@unique([userId, boardId])` 제약 조건
- **프로필 관리**
  - 마이페이지(`/mypage`)에서 사용자 정보 확인 및 수정 가능 (이름, 닉네임 등)
  - 가입일 및 권한(role) 표시
  - "위험 구역" 영역에 계정 삭제 안내 제공

### 🔧 관리자 기능

- **게시글 관리**
  - 게시글 생성: `/admin/post/create`
  - 게시글 수정: `/admin/post/edit/[id]`
  - 게시글 삭제: 삭제 확인 모달 → 삭제 후 목록 페이지로 리다이렉션
  - 관리자만 수정/삭제 버튼 접근 가능
- **회원 관리**
  - 관리자 페이지(`/admin/users`)에서 전체 사용자 목록 조회
  - 이름, 이메일, 닉네임 기준 검색 기능 제공
  - 현재 로그인한 관리자는 목록에서 자동 제외
  - 검색 관련 함수: `getAllUsersWithoutSelf`, `searchUsersWithoutSelf`
- **카테고리 관리**
  - 게시글은 JavaScript, TypeScript, React 등 기술 카테고리에 분류됨
  - `/categories` 경로 기반의 카테고리 탐색 및 필터링 가능

### 🔍 검색 및 탐색

- **MySQL FULLTEXT 기반 전문 검색**
  - `title`, `content` 컬럼에 대해 `FULLTEXT INDEX` 적용
  - `MATCH(title, content) AGAINST (...)` 쿼리를 사용한 고속 검색 구현
  - 검색 결과는 `relevance` 기준으로 정렬해 정확도 향상
  - 기존 Prisma DSL 쿼리를 `$queryRaw` 기반으로 리팩토링
- **카테고리별 필터링**
  - 게시글은 특정 카테고리에 속하며, 해당 카테고리 별로 필터링 가능
  - 카테고리는 관리자 혹은 Seed 데이터로 관리됨
- **실시간 검색 반영**
  - 사용자의 키워드 입력에 따라 검색 결과가 즉시 반영되며 UX 개선

### 🧱 접근 제어 및 보안

- **미들웨어 기반 접근 제어 (`middleware.ts`)**
  - 로그인된 사용자는 `/login`, `/signup` 접근 시 홈으로 이동
  - 비로그인 사용자는 `/mypage` 접근 시 `/login`으로 이동
  - 일반 사용자가 `/admin` 접근 시 홈으로 리디렉트
  - 접근 권한 경로는 `src/constants/routes.ts`에서 상수로 관리 (`PUBLIC_ROUTES`, `ADMIN_ROUTES`, `MYPAGE_ROUTES`)

### 🎨 메인 페이지 구성

- **UI 섹션**
  - 소개 영역, 카테고리 목록, 인기 게시글 영역 등으로 구성
  - Tailwind 기반의 테마 컬러 및 그라데이션 배경 적용
- **유저 환영 메시지**
  - 로그인 여부에 따라 환영 메시지 또는 로그인 버튼 렌더링 처리
- **공통 레이아웃 적용**
  - `MainLayout` 컴포넌트를 활용하여 일관된 페이지 구성 유지
  - 헤더, 푸터, 네비게이션 등 공통 UI 컴포넌트로 분리 구성

## 🛠 기술 스택

### Frontend

- **Next.js 15**: App Router, Server Components
- **TypeScript**: 타입 안전성 보장
- **Tailwind CSS**: 유틸리티 기반 스타일링
- **shadcn/ui**: 재사용 가능한 UI 컴포넌트
- **React Hook Form**: 폼 상태 관리
- **Zod**: 스키마 검증

### Backend

- **Next.js API Routes**: 서버리스 API
- **NextAuth.js**: 인증 및 세션 관리
- **Prisma**: ORM 및 데이터베이스 관리
- **MySQL**: 관계형 데이터베이스
- **bcryptjs**: 비밀번호 해싱

### 개발 도구

- **ESLint**: 코드 품질 관리
- **Prettier**: 코드 포맷팅
- **TypeScript**: 정적 타입 검사

## 📁 프로젝트 구조

```
hanaro/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # 인증 관련 페이지
│   │   ├── login/
│   │   └── signup/
│   ├── (main)/                   # 메인 애플리케이션
│   │   ├── categories/           # 카테고리 페이지
│   │   ├── mypage/               # 마이페이지
│   │   └── post/                 # 게시글 상세
│   ├── admin/                    # 관리자 페이지
│   ├── api/                      # API 라우트
│   └── globals.css               # 전역 스타일
├── actions/                      # Server Actions
│   ├── admin.ts                  # 관리자 액션
│   ├── auth.ts                   # 인증 액션
│   ├── profile.ts                # 프로필 액션
│   └── reaction.ts               # 반응 액션
├── components/                   # React 컴포넌트
│   ├── admin/                    # 관리자 컴포넌트
│   ├── auth/                     # 인증 컴포넌트
│   ├── category/                 # 카테고리 컴포넌트
│   ├── layout/                   # 레이아웃 컴포넌트
│   ├── main/                     # 메인 페이지 컴포넌트
│   ├── mypage/                   # 마이페이지 컴포넌트
│   ├── reaction/                 # 반응 컴포넌트
│   └── ui/                       # 공통 UI 컴포넌트
├── data/                         # 데이터 액세스 레이어
│   ├── category.ts
│   ├── post.ts
│   ├── reaction.ts
│   └── user.ts
├── lib/                          # 유틸리티 및 설정
│   ├── prisma.ts                 # Prisma 클라이언트
│   ├── schemas/                  # Zod 스키마
│   └── utils.ts                  # 공통 유틸리티
├── prisma/                       # 데이터베이스 스키마
│   ├── schema.prisma
│   ├── migrations/
│   └── seed.ts
└── types/                        # TypeScript 타입 정의
```

## ERD

<div align="center">
  <img src="https://github.com/user-attachments/assets/a5b97e1d-03ec-40be-9b6b-2afb83b1af3a" width="500" />
</div>

## 구현 화면

<table>
 <tr>
  <td>회원가입</td>
  <td align="center">
   <img src="https://github.com/user-attachments/assets/c497f815-08ae-4b41-82ab-d03596c718bf" />
  </td>
  </tr>
 <tr>
<td>로그인 및 마이페이지</td>
  <td align="center">
   <img src="https://github.com/user-attachments/assets/b6884b4f-7c44-4f2c-8129-f73636ea74f9" />
  </td>
</tr>
<tr>
<td>회원탈퇴</td>
  <td align="center">
   <img src="https://github.com/user-attachments/assets/ab564b51-d892-428e-aefa-60d6605bd731" />
</td>
</tr>
<tr>
<td>게시글</td>
  <td align="center">
   <img src="https://github.com/user-attachments/assets/e4ee2c53-e49d-4c35-93a5-2f82a4291b13" />
</td>
</tr>
<tr>
<td>게시글 생성</td>
  <td align="center">
   <img src="https://github.com/user-attachments/assets/7f33cd9a-3806-4480-9a87-bd19d6959153" />
</td>
</tr>
<tr>
<td>게시글 수정 및 삭제</td>
  <td align="center">
   <img src="https://github.com/user-attachments/assets/787d3ec4-161e-4f38-8d95-147149a0073f" />
</td>
</tr>
