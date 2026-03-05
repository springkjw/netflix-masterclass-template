# AWS 배포 가이드 (강의 상세판)

## 0) 배포 아키텍처(권장)

1. 로컬에서 Docker 이미지 빌드
2. Amazon ECR(이미지 저장소)에 푸시
3. Amazon ECS Fargate 서비스로 실행
4. ALB(Application Load Balancer) + ACM(HTTPS 인증서) 연결

> [강의포인트] 실습에서는 "한 번 배포 성공"보다 "다음 배포도 안전하게 반복"이 더 중요합니다.

## 1) 사전 준비

- AWS CLI 설치 및 로그인 프로파일 설정
- AWS 리전 결정(예: `ap-northeast-2`)
- ECR 리포지토리 생성
- ECS 클러스터/서비스 생성 권한 확인

## 2) 로컬 빌드 + Docker 동작 확인

```bash
# 앱 빌드 확인
yarn build

# Docker 이미지 생성
docker build -t netflix-masterclass-template:1.0.0 .

# 로컬 실행 테스트
docker run --rm -p 3000:3000 netflix-masterclass-template:1.0.0
```

검증 포인트:

- `http://localhost:3000` 접속
- 홈/검색/상세 라우팅 정상 동작
- 브라우저 콘솔 에러 없음

## 3) ECR 푸시 절차

아래 값은 예시이며, 실제 수업에서는 placeholder를 각 팀 값으로 바꿉니다.

- `<ACCOUNT_ID>`: AWS 계정 ID
- `<REGION>`: `ap-northeast-2` 등
- `<REPO>`: ECR 리포지토리 이름

```bash
# 1) ECR 로그인
aws ecr get-login-password --region <REGION> \
  | docker login --username AWS --password-stdin <ACCOUNT_ID>.dkr.ecr.<REGION>.amazonaws.com

# 2) 태그 지정
docker tag netflix-masterclass-template:1.0.0 \
  <ACCOUNT_ID>.dkr.ecr.<REGION>.amazonaws.com/<REPO>:1.0.0

# 3) 푸시
docker push <ACCOUNT_ID>.dkr.ecr.<REGION>.amazonaws.com/<REPO>:1.0.0
```

> [강의포인트] 태그는 `latest`만 쓰지 말고 `1.0.0`, `2026-03-05`처럼 추적 가능한 규칙을 사용합니다.

## 4) ECS Fargate 배포 순서

1. ECS Task Definition 생성
   - 컨테이너 이미지: `.../<REPO>:1.0.0`
   - 컨테이너 포트: `3000`
   - CPU/Memory 예: `0.25 vCPU / 0.5 GB`
2. ECS Service 생성 (Launch type: Fargate)
3. ALB Target Group 연결
4. 보안 그룹에서 ALB(80/443) 허용, ECS는 ALB에서 오는 트래픽만 허용

검증 포인트:

- ECS 서비스 상태 `Running`
- Target Group health check `healthy`
- ALB DNS로 접속 시 페이지 로드 정상

## 5) HTTPS(ACM) 연결

1. ACM에서 도메인 인증서 발급
2. ALB 리스너 443 생성 후 인증서 연결
3. 80 → 443 리다이렉트 설정

## 6) 운영 체크리스트

- [ ] `yarn build` 성공
- [ ] Docker 로컬 실행 성공
- [ ] ECR 푸시 완료
- [ ] ECS 배포 후 `healthy` 확인
- [ ] 도메인/SSL 적용
- [ ] 메인/검색/상세 페이지 QA

## 7) 수업 중 꼭 짚을 포인트

- "개발 환경과 배포 환경의 차이"
- "이미지 태그 전략 (`v1`, `v2`)"
- "롤백 가능한 배포 설계 (이전 태그 재배포)"
- "보안 그룹 최소 권한 원칙"
