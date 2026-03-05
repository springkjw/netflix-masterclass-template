'use client';

import { useQuery } from '@tanstack/react-query';
import type { Content } from '@models/content';

async function fetchSearchResults(keyword: string): Promise<Content[]> {
  const response = await fetch(`/api/contents/search?keyword=${encodeURIComponent(keyword)}`);
  if (!response.ok) {
    throw new Error('Failed to fetch search results');
  }
  return response.json();
}

export function useContentSearch(keyword: string) {
  return useQuery({
    queryKey: ['content-search', keyword],
    queryFn: () => fetchSearchResults(keyword),
    enabled: Boolean(keyword.trim()),
  });
}
