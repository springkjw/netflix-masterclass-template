# AWS 배포 가이드 (EC2 직접 배포)

## 0) 배포 아키텍처(수강생 권장)

1. 로컬에서 앱 빌드 확인
2. EC2 서버(ubuntu)에 SSH 접속
3. Docker + Docker Compose 설치
4. 레포 클론 후 컨테이너 실행
5. 보안그룹/도메인 설정

> [강의포인트] ECS/ECR보다 러닝커브가 낮아서 특강/미션에 적합합니다.

## 1) 사전 준비

- EC2 인스턴스 생성 (Ubuntu 22.04 권장)
- 보안 그룹 오픈
  - `22` (SSH)
  - `80` (HTTP)
  - `443` (HTTPS, 선택)
  - `3000` (초기 테스트용, 선택)
- SSH 키 페어 준비 (`.pem`)

## 2) 로컬에서 사전 검증

```bash
yarn install
yarn build
docker build -t netflix-masterclass-template:1.0.0 .
docker run --rm -p 3000:3000 netflix-masterclass-template:1.0.0
```

검증 포인트:

- `http://localhost:3000` 접속
- 홈/검색/상세 라우팅 정상 동작
- 콘솔 에러 없음

## 3) EC2 접속 및 Docker 설치

```bash
ssh -i <key.pem> ubuntu@<EC2_PUBLIC_IP>

sudo apt-get update
sudo apt-get install -y ca-certificates curl gnupg

sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg

echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt-get update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

sudo usermod -aG docker $USER
newgrp docker
```

## 4) 프로젝트 배포

```bash
git clone https://github.com/<YOUR_ID>/netflix-masterclass-template.git
cd netflix-masterclass-template

cp .env.example .env.local

docker compose up -d --build
docker compose ps
```

검증:

- `http://<EC2_PUBLIC_IP>:3000` 접속

## 5) 무중단에 가까운 업데이트(수업용 간단 버전)

```bash
cd netflix-masterclass-template
git pull origin main
docker compose up -d --build
docker image prune -f
```

> [강의포인트] 롤백은 `git checkout <이전_커밋>` 후 동일 명령으로 복구할 수 있습니다.

## 6) 로컬 배포 스크립트 사용(권장)

프로젝트에서 아래 명령으로 EC2 배포를 자동화할 수 있습니다.

```bash
yarn deploy:ec2 ~/.ssh/my-key.pem ubuntu@<EC2_PUBLIC_IP> main
```

스크립트가 수행하는 작업:

- 원격 서버 Docker/Docker Compose 설치 여부 확인
- 레포 클론 또는 최신 코드 pull
- `.env.local` 자동 생성(`.env.example` 기반)
- `docker compose up -d --build` 실행
- 미사용 이미지 정리

## 7) 운영형(선택): 80/443 연결

### 빠른 방법

- Nginx 리버스 프록시를 두고 `80 -> 3000` 전달
- 도메인 연결 후 Certbot으로 HTTPS 발급

### 수업에서 설명할 최소 개념

- "앱 포트(3000)와 외부 포트(80/443) 분리"
- "보안그룹 최소 개방"
- "TLS 인증서는 서버 신뢰의 기본"

## 8) 운영 체크리스트

- [ ] `yarn build` 성공
- [ ] `docker compose up -d --build` 성공
- [ ] EC2 보안 그룹 설정 확인
- [ ] 페이지 진입/검색/상세 동작 확인
- [ ] 배포 후 로그 확인 (`docker compose logs -f`)

## 9) 확장 트랙(강사용)

- 수강생 기본 트랙: EC2 직접 배포
- 심화 트랙: ECS/ECR + GitHub Actions 자동 배포

필요 시 프로젝트 내 `.github/workflows/deploy-ecs.yml`을 심화 예제로 활용하세요.
