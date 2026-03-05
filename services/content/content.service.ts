import { DATA_SOURCE } from '@constants/app';
import type { ContentSearchParams, ContentType } from '@models/content';
import { ContentApiRepository } from './content.api.repository';
import { ContentMockRepository } from './content.mock.repository';
import type { ContentRepository } from './content.repository';

function createContentRepository(): ContentRepository {
  // [강의포인트] 실무에서는 mock/api 구현체를 인터페이스 뒤로 감춰 교체 비용을 줄입니다.
  if (DATA_SOURCE === 'api') {
    return new ContentApiRepository();
  }

  return new ContentMockRepository();
}

const contentRepository = createContentRepository();

export async function getAllContents() {
  return contentRepository.getAll();
}

export async function getContentById(id: number) {
  return contentRepository.getById(id);
}

export async function getContentsByType(type: ContentType) {
  return contentRepository.getByType(type);
}

export async function searchContents(params: ContentSearchParams) {
  return contentRepository.search(params);
}
