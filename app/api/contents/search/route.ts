import { mockContents } from '@constants/mockContents';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const keyword = (searchParams.get('keyword') ?? '').trim().toLowerCase();

  if (!keyword) {
    return NextResponse.json([]);
  }

  const searched = mockContents.filter((item) => {
    return (
      item.title.toLowerCase().includes(keyword) ||
      item.description.toLowerCase().includes(keyword) ||
      item.genres.some((genre) => genre.toLowerCase().includes(keyword)) ||
      item.cast.some((name) => name.toLowerCase().includes(keyword))
    );
  });

  return NextResponse.json(searched);
}
