import { isProduction } from '@constants/app';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

function createVisitorToken() {
  return Math.abs(Math.floor(Math.random() * 100000000) - Date.now()).toString();
}

export function middleware(request: NextRequest) {
  // [강의포인트] middleware는 페이지/API 라우트보다 먼저 실행되는 공통 관문입니다.
  // 요청 헤더/쿠키를 중앙에서 정규화하면 각 페이지마다 중복 처리 코드를 줄일 수 있습니다.
  const response = NextResponse.next();

  const userAgent = request.headers.get('user-agent') || '';
  if (userAgent) {
    response.cookies.set('x-user-agent', userAgent, {
      httpOnly: false,
      secure: isProduction,
      // [강의포인트] sameSite: 'lax'는 기본 탐색(GET)에는 쿠키를 보내고,
      // 외부 사이트에서 발생한 CSRF 성격의 서브 요청에는 쿠키 전송을 줄이는 절충안입니다.
      sameSite: 'lax',
      maxAge: 60 * 60 * 24,
    });
  }

  const referrer = request.headers.get('referer') || '';
  if (referrer) {
    response.cookies.set('x-referrer', referrer, {
      httpOnly: true,
      secure: isProduction,
      // [강의포인트] 추적용 쿠키도 동일하게 'lax'를 사용해 과도한 cross-site 전송을 억제합니다.
      sameSite: 'lax',
      maxAge: 60 * 60,
    });
  }

  const visitorToken = request.cookies.get('visitorToken')?.value;
  if (!visitorToken) {
    response.cookies.set('visitorToken', createVisitorToken(), {
      httpOnly: false,
      secure: isProduction,
      // [강의포인트] 사용자 식별 토큰은 로그인 세션이 아니므로 strict 대신 lax를 사용해
      // 사용성을 유지하면서 기본적인 CSRF 완화 효과를 확보합니다.
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 365,
    });
  }

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
