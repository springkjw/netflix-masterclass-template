'use client';

import type { Content } from '@models/content';
import { useRef } from 'react';
import MovieCard from './MovieCard';

interface MovieRowProps {
  title: string;
  items: Content[];
}

export default function MovieRow({ title, items }: MovieRowProps) {
  const rowRef = useRef<HTMLDivElement>(null);

  const scrollByStep = (direction: 'left' | 'right') => {
    if (!rowRef.current) {
      return;
    }

    const step = rowRef.current.clientWidth * 0.85;
    rowRef.current.scrollBy({
      left: direction === 'left' ? -step : step,
      behavior: 'smooth',
    });
  };

  return (
    <section className="movie-row">
      <div className="movie-row__head">
        <h2>{title}</h2>
        <div>
          <button onClick={() => scrollByStep('left')} aria-label={`${title} left`}>
            ←
          </button>
          <button onClick={() => scrollByStep('right')} aria-label={`${title} right`}>
            →
          </button>
        </div>
      </div>

      {/* [강의포인트] 리스트 렌더링은 map + key 기본기와 카드 컴포넌트 재사용을 동시에 보여줍니다. */}
      <div ref={rowRef} className="movie-row__track">
        {items.map((item) => (
          <MovieCard key={item.id} content={item} />
        ))}
      </div>
    </section>
  );
}
