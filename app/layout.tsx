import type { Metadata } from 'next';
import { Suspense, type ReactNode } from 'react';
import { APP_DESCRIPTION, APP_NAME } from '@constants/app';
import Header from '@components/layout/Header';
import Provider from '@components/Provider';
import '@theme/tokens.css';
import '@theme/globals.css';

export const metadata: Metadata = {
  title: APP_NAME,
  description: APP_DESCRIPTION,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <Provider>
          <div className="app-shell">
            <Suspense fallback={null}>
              <Header />
            </Suspense>
            <main>{children}</main>
          </div>
        </Provider>
      </body>
    </html>
  );
}
