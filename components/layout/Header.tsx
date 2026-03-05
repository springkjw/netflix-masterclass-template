'use client';

import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { FormEvent, useEffect, useMemo, useState } from 'react';

const MENUS = [
  { label: '홈', href: '/' },
  { label: '시리즈', href: '/search?q=series' },
  { label: '영화', href: '/search?q=movie' },
  { label: '애니메이션', href: '/search?q=animation' },
];

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [query, setQuery] = useState(params?.get('q') ?? '');

  useEffect(() => {
    setQuery(params?.get('q') ?? '');
  }, [params]);

  // [강의포인트] UI state(입력값)와 URL state(검색 파라미터)를 분리하면 상태 흐름을 설명하기 쉽습니다.
  const isSearchPage = useMemo(() => pathname?.startsWith('/search') ?? false, [pathname]);

  const onSubmitSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = query.trim();
    router.push(trimmed ? `/search?q=${encodeURIComponent(trimmed)}` : '/search');
  };

  return (
    <header className="header">
      <div className="header__inner">
        <Link href="/" className="header__brand" aria-label="Go home">
          NETFLIX
        </Link>

        <nav className="header__nav" aria-label="main">
          {MENUS.map((menu) => (
            <Link key={menu.label} href={menu.href} className="header__nav-link">
              {menu.label}
            </Link>
          ))}
        </nav>

        <form className="header__search" onSubmit={onSubmitSearch}>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="제목, 장르, 배우"
            aria-label="search"
          />
          <button type="submit">검색</button>
        </form>
      </div>
      {isSearchPage ? <p className="header__hint">검색 결과 페이지</p> : null}
    </header>
  );
}
