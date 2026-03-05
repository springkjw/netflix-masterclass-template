import type { ContentSearchParams, ContentType } from '@models/content';
import { apiClient } from '@utils/httpClient';
import type { ContentRepository } from './content.repository';

export class ContentApiRepository implements ContentRepository {
  async getAll() {
    const response = await apiClient.get('/contents');
    return response.data;
  }

  async getById(id: number) {
    const response = await apiClient.get(`/contents/${id}`);
    return response.data;
  }

  async getByType(type: ContentType) {
    const response = await apiClient.get('/contents', { params: { type } });
    return response.data;
  }

  async search({ keyword = '' }: ContentSearchParams) {
    const response = await apiClient.get('/contents/search', {
      params: { keyword },
    });
    return response.data;
  }
}
