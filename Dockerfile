# [강의포인트] Next.js 멀티 스테이지 빌드:
# 1) deps: 의존성 설치
# 2) build: next build 실행
# 3) runtime: standalone 서버만 복사해 경량 실행

FROM node:22-alpine AS deps
WORKDIR /app

# [강의포인트] Yarn 사용을 위해 Corepack 활성화
RUN corepack enable

# [강의포인트] 의존성 캐시 효율을 위해 manifest/lock 파일 먼저 복사
COPY package.json yarn.lock .yarnrc.yml ./
RUN yarn install --immutable

FROM node:22-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN corepack enable

# [실습] Next.js 프로덕션 빌드 (.next 생성)
RUN yarn build

FROM node:22-alpine AS runtime
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# [강의포인트] standalone 모드 결과물은 server.js 포함
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static

# [강의포인트] public 폴더를 사용한다면 함께 복사
COPY --from=build /app/public ./public

EXPOSE 3000
CMD ["node", "server.js"]
