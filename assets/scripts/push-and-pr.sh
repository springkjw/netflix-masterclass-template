#!/bin/bash

set -e

CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
TARGET_BRANCH="${1:-$CURRENT_BRANCH}"
TAG_PREFIX="pr-"
TAG_NAME="${TAG_PREFIX}${TARGET_BRANCH}"

echo "Target branch: ${TARGET_BRANCH}"
git push -u origin "${TARGET_BRANCH}" || git push origin "${TARGET_BRANCH}"

if git rev-parse "${TAG_NAME}" >/dev/null 2>&1; then
  git tag -d "${TAG_NAME}"
fi

git tag "${TAG_NAME}"
git push origin "${TAG_NAME}"
git tag -d "${TAG_NAME}"

echo "Done. Tag '${TAG_NAME}' pushed to trigger auto PR workflow."
