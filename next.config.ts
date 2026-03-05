import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // [강의포인트] output: 'standalone'은 배포에 필요한 최소 런타임 파일만 추적해
  // `.next/standalone` 폴더를 생성합니다. Docker 이미지에 앱 전체 소스 대신
  // 이 산출물만 복사할 수 있어 이미지 크기와 배포 시간을 줄일 수 있습니다.
  output: 'standalone',
  poweredByHeader: false,
  reactStrictMode: true,
  compress: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'picsum.photos' },
      { protocol: 'https', hostname: 'placehold.co' },
    ],
  },
  // [강의포인트] lint/typecheck는 CI 단계에서 별도 게이트로 강제하고,
  // Next 빌드 단계에서는 중복 검사 비용을 줄이기 위해 ESLint를 건너뜁니다.
  eslint: {
    ignoreDuringBuilds: true,
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            // [강의포인트] clickjacking 방지: 외부 사이트 iframe 삽입 제한
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            // [강의포인트] MIME 스니핑 방지: 브라우저가 콘텐츠 타입을 임의 추론하지 않도록 고정
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            // [강의포인트] 리퍼러 노출 최소화: 동일 보안수준 전송에서만 상세 referrer 전달
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
