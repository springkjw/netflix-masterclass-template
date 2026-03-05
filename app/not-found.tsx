import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="page-message">
      콘텐츠를 찾을 수 없습니다. <Link href="/">홈으로 돌아가기</Link>
    </section>
  );
}
