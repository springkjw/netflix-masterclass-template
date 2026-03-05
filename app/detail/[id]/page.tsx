import { getContentById } from '@services';
import { notFound } from 'next/navigation';

interface DetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function DetailPage({ params }: DetailPageProps) {
  const { id } = await params;
  const parsedId = Number(id);

  if (Number.isNaN(parsedId)) {
    notFound();
  }

  const content = await getContentById(parsedId);

  if (!content) {
    notFound();
  }

  return (
    <section className="detail-page">
      <img src={content.heroUrl} alt={content.title} className="detail-page__image" />
      <div className="detail-page__body">
        {/* [강의포인트] 상세 페이지는 URL 파라미터로 상태를 공유하는 대표 사례입니다. */}
        <p className="detail-page__eyebrow">
          {content.type.toUpperCase()} · {content.ageRating}
        </p>
        <h1>{content.title}</h1>
        <p className="detail-page__meta">
          {content.releaseYear} · {content.runningTime}
        </p>
        <p className="detail-page__description">{content.description}</p>
        <p className="detail-page__meta">장르: {content.genres.join(', ')}</p>
        <p className="detail-page__meta">출연: {content.cast.join(', ')}</p>
      </div>
    </section>
  );
}
