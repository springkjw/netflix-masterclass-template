# Netflix Masterclass Template

2시간 특강용 템플릿을 실무형 구조로 확장한 버전입니다.
Next.js(App Router) + TypeScript + Yarn + React Query + Axios 기준으로 구성했습니다.

## 핵심 목표

- 교육/실무 균형형 구조 학습 (`app`, `components`, `services`, `hooks`, `utils`, `types`, `constants`)
- 서버 우선 렌더링 + 클라이언트 상호작용 최소화
- Mock/API 이중화로 개발-운영 전환 비용 축소
- lint/typecheck/format 품질 게이트 적용
- Docker + AWS ECS 배포 파이프라인 기반 준비

## 실행 방법 (Yarn)

```bash
yarn install
yarn dev
```

품질/빌드 확인:

```bash
yarn lint
yarn typecheck
yarn format:check
yarn build
yarn start
```

## 프로젝트 구조

```text
app/
  api/
  detail/[id]/
  search/
assets/scripts/
components/
  Provider/
  hero/
  layout/
  movie/
constants/
hooks/
services/
  content/
theme/
types/
utils/
docs/
  architecture.md
  live-coding-script.md
  mission-rubric.md
  aws-deploy-guide.md
```

## 강의 포인트 주석 규칙

- `[강의포인트]`: 왜 이렇게 설계하는지 설명
- `[실습]`: 수강생이 직접 입력할 코드
- `[확장]`: 미션 과제로 확장할 지점

## 환경 변수

`.env.local` 예시:

```bash
NEXT_PUBLIC_DATA_SOURCE=mock
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api
```

- `NEXT_PUBLIC_DATA_SOURCE=mock`: 로컬 mock 저장소 사용
- `NEXT_PUBLIC_DATA_SOURCE=api`: axios 기반 API 저장소 사용

## Docker 실행

```bash
docker build -t netflix-masterclass-template .
docker run -p 3000:3000 netflix-masterclass-template
```

또는:

```bash
docker compose up --build
```

브라우저에서 `http://localhost:3000` 접속.

## 배포 자동화

- CI: `.github/workflows/ci.yml`
- ECS 배포: `.github/workflows/deploy-ecs.yml`
- 로컬 디스패치 스크립트: `yarn deploy:dispatch`

## AWS 배포 참고

상세 절차는 `docs/aws-deploy-guide.md`를 참고하세요.
