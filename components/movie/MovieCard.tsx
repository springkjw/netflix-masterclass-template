import Link from 'next/link';
import type { Content } from '@models/content';

interface MovieCardProps {
  content: Content;
}

export default function MovieCard({ content }: MovieCardProps) {
  return (
    <Link href={`/detail/${content.id}`} className="movie-card">
      <img src={content.thumbnailUrl} alt={content.title} loading="lazy" />
      <div className="movie-card__meta">
        <h3>{content.title}</h3>
        <p>
          {content.releaseYear} · {content.runningTime}
        </p>
      </div>
    </Link>
  );
}
