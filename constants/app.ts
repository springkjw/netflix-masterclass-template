export const APP_NAME = 'Netflix Masterclass Template';
export const APP_DESCRIPTION = 'Next.js + TypeScript special lecture template';

export const API_TIMEOUT_MS = 5000;
export const MOCK_API_DELAY_MS = 250;

export const isProduction = process.env.NODE_ENV === 'production';

export const DATA_SOURCE = process.env.NEXT_PUBLIC_DATA_SOURCE ?? 'mock';
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:3000/api';
