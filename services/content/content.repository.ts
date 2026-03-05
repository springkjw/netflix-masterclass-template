import type { Content, ContentSearchParams, ContentType } from '@models/content';

export interface ContentRepository {
  getAll(): Promise<Content[]>;
  getById(id: number): Promise<Content | null>;
  getByType(type: ContentType): Promise<Content[]>;
  search(params: ContentSearchParams): Promise<Content[]>;
}
