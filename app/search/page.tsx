import MovieCard from '@components/movie/MovieCard';
import { searchContents } from '@services';

interface SearchPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const resolvedSearchParams = await searchParams;
  const q = resolvedSearchParams.q;
  const keyword = (Array.isArray(q) ? q[0] : q) ?? '';

  // [실습] 검색어를 URL에서 읽어 서버에서 먼저 필터링하고, 결과를 렌더링합니다.
  const results = keyword ? await searchContents({ keyword }) : [];

  return (
    <section className="search-page">
      <h1>
        검색어: <span>{keyword || '입력 없음'}</span>
      </h1>

      {keyword && results.length === 0 ? (
        // [확장] 추천 검색어 chips를 노출하면 UX를 한 단계 올릴 수 있습니다.
        <p className="page-message">일치하는 결과가 없습니다. 다른 키워드로 시도해보세요.</p>
      ) : null}

      {results.length > 0 ? (
        <div className="search-grid">
          {results.map((item) => (
            <MovieCard key={item.id} content={item} />
          ))}
        </div>
      ) : null}
    </section>
  );
}
