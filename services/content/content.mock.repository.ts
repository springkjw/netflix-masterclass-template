import { MOCK_API_DELAY_MS } from '@constants/app';
import { mockContents } from '@constants/mockContents';
import type { ContentSearchParams, ContentType } from '@models/content';
import { delay } from '@utils/delay';
import type { ContentRepository } from './content.repository';

export class ContentMockRepository implements ContentRepository {
  async getAll() {
    return delay(mockContents, MOCK_API_DELAY_MS);
  }

  async getById(id: number) {
    const found = mockContents.find((item) => item.id === id) ?? null;
    return delay(found, MOCK_API_DELAY_MS);
  }

  async getByType(type: ContentType) {
    return delay(
      mockContents.filter((item) => item.type === type),
      MOCK_API_DELAY_MS,
    );
  }

  async search({ keyword = '' }: ContentSearchParams) {
    const normalized = keyword.trim().toLowerCase();

    if (!normalized) {
      return delay([], MOCK_API_DELAY_MS);
    }

    return delay(
      mockContents.filter((item) => {
        return (
          item.title.toLowerCase().includes(normalized) ||
          item.description.toLowerCase().includes(normalized) ||
          item.genres.some((genre) => genre.toLowerCase().includes(normalized)) ||
          item.cast.some((name) => name.toLowerCase().includes(normalized))
        );
      }),
      MOCK_API_DELAY_MS,
    );
  }
}
