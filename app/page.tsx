import HeroBanner from '@components/hero/HeroBanner';
import MovieRow from '@components/movie/MovieRow';
import { getAllContents, getContentsByType } from '@services';

export default async function HomePage() {
  // [강의포인트] 서버 컴포넌트에서 데이터를 먼저 불러오면 초기 렌더 비용을 줄일 수 있습니다.

  const [allContents, movies, series, animations] = await Promise.all([
    getAllContents(),
    getContentsByType('movie'),
    getContentsByType('series'),
    getContentsByType('animation'),
  ]);

  const featured = allContents[0];

  if (!featured) {
    return <section className="page-message">콘텐츠를 불러오는 중입니다...</section>;
  }

  return (
    <>
      <HeroBanner featured={featured} />

      <section className="page-content">
        {/* [실습] 첫 번째 행만 먼저 만들고, 이후 제목/데이터만 바꿔서 재사용해봅니다. */}
        <MovieRow title="지금 뜨는 영화" items={movies} />
        <MovieRow title="정주행 시리즈" items={series} />
        {/* [확장] 애니메이션 대신 "오늘의 TOP 10"처럼 정렬/슬라이싱 로직을 추가해도 좋습니다. */}
        <MovieRow title="애니메이션 큐레이션" items={animations} />
      </section>
    </>
  );
}
