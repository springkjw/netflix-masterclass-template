import { mockContents } from '@constants/mockContents';
import { NextResponse } from 'next/server';

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(_request: Request, context: RouteContext) {
  const { id } = await context.params;
  const contentId = Number(id);
  const content = mockContents.find((item) => item.id === contentId);

  if (!content) {
    return NextResponse.json({ message: 'NOT_FOUND' }, { status: 404 });
  }

  return NextResponse.json(content);
}
