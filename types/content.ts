export type ContentType = 'movie' | 'series' | 'animation' | 'variety';

export interface Content {
  id: number;
  title: string;
  type: ContentType;
  releaseYear: number;
  ageRating: 'ALL' | '12' | '15' | '19';
  runningTime: string;
  description: string;
  genres: string[];
  cast: string[];
  thumbnailUrl: string;
  heroUrl: string;
}

export interface ContentSearchParams {
  keyword?: string;
  type?: ContentType;
}
