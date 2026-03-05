#!/usr/bin/env bash

set -euo pipefail

usage() {
  cat <<'EOF'
Usage:
  bash ./assets/scripts/deploy-ec2.sh <pem_key_path> <ec2_user@host> [branch]

Example:
  bash ./assets/scripts/deploy-ec2.sh ~/.ssh/netflix.pem ubuntu@43.201.10.10 main

Optional env vars:
  REPO_URL   Remote repository URL (default: git remote origin)
  APP_DIR    Remote app directory name (default: netflix-masterclass-template)
EOF
}

if [[ "${1:-}" == "-h" || "${1:-}" == "--help" ]]; then
  usage
  exit 0
fi

KEY_PATH="${1:-}"
REMOTE_HOST="${2:-}"
BRANCH="${3:-main}"

if [[ -z "$KEY_PATH" || -z "$REMOTE_HOST" ]]; then
  usage
  exit 1
fi

if [[ ! -f "$KEY_PATH" ]]; then
  echo "[오류] PEM 키 파일을 찾을 수 없습니다: $KEY_PATH"
  exit 1
fi

REPO_URL="${REPO_URL:-$(git config --get remote.origin.url || true)}"
APP_DIR="${APP_DIR:-netflix-masterclass-template}"

if [[ -z "$REPO_URL" ]]; then
  echo "[오류] REPO_URL을 확인할 수 없습니다. 환경변수 REPO_URL을 지정하세요."
  exit 1
fi

echo "[배포] host=$REMOTE_HOST branch=$BRANCH app_dir=$APP_DIR"

ssh -i "$KEY_PATH" "$REMOTE_HOST" bash <<EOF
set -euo pipefail

if ! command -v docker >/dev/null 2>&1; then
  echo "[오류] 원격 서버에 Docker가 설치되어 있지 않습니다."
  exit 1
fi

if ! docker compose version >/dev/null 2>&1; then
  echo "[오류] 원격 서버에 Docker Compose 플러그인이 설치되어 있지 않습니다."
  exit 1
fi

if [[ ! -d "$APP_DIR/.git" ]]; then
  git clone "$REPO_URL" "$APP_DIR"
fi

cd "$APP_DIR"
git fetch origin
git checkout "$BRANCH"
git pull origin "$BRANCH"

if [[ ! -f .env.local && -f .env.example ]]; then
  cp .env.example .env.local
fi

docker compose up -d --build
docker image prune -f
docker compose ps
EOF

echo "[완료] EC2 배포가 끝났습니다."
