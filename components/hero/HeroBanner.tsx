import Link from 'next/link';
import type { Content } from '@models/content';

interface HeroBannerProps {
  featured: Content;
}

export default function HeroBanner({ featured }: HeroBannerProps) {
  return (
    <section className="hero" style={{ backgroundImage: `url(${featured.heroUrl})` }}>
      <div className="hero__overlay" />
      <div className="hero__content">
        <p className="hero__eyebrow">Featured • {featured.releaseYear}</p>
        <h1>{featured.title}</h1>
        <p>{featured.description}</p>
        <div className="hero__actions">
          <Link href={`/detail/${featured.id}`} className="hero__link-btn">
            상세 정보
          </Link>
          <button className="hero__ghost">내가 찜한 리스트</button>
        </div>
      </div>
    </section>
  );
}
