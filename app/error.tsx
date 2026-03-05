'use client';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: ErrorProps) {
  return (
    <section className="page-message">
      <p>예상치 못한 오류가 발생했습니다.</p>
      <p>{error.message}</p>
      <button onClick={reset}>다시 시도</button>
    </section>
  );
}
