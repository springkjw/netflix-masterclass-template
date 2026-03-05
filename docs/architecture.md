# 아키텍처 가이드

## 1) 레이어 구성

- `app`: Next.js App Router + Route Handler
- `components`: 재사용 UI와 Provider
- `services`: 도메인별 비즈니스/저장소 계층
- `constants`: 환경 변수 및 목업 데이터
- `hooks`: 클라이언트 전용 커스텀 훅
- `utils`: HTTP, QueryClient, 공통 유틸
- `types`: 도메인 타입 정의 (`Content`)
- `theme`: 토큰 + 전역 스타일

## 2) 데이터 흐름

1. `app/page.tsx`가 서버에서 `services/content` 호출
2. `services/content.service.ts`가 mock/api 저장소 구현체를 선택
3. 데이터를 `HeroBanner`, `MovieRow`에 props로 전달
4. `MovieCard` 클릭 시 `/detail/:id`로 이동
5. `app/detail/[id]/page.tsx`가 URL 파라미터 기반 조회
6. `app/search/page.tsx`가 `q` 쿼리로 검색 결과 렌더링

## 3) 강의 강조 포인트

- "상태를 어디에 둘지" 먼저 결정한 뒤 컴포넌트 분리
- "재사용 가능한 단위"로 UI 나누기
- URL을 상태 저장소처럼 활용하기 (`q`, `id`)
