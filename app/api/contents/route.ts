import { mockContents } from '@constants/mockContents';
import type { ContentType } from '@models/content';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type') as ContentType | null;

  if (!type) {
    return NextResponse.json(mockContents);
  }

  return NextResponse.json(mockContents.filter((item) => item.type === type));
}
