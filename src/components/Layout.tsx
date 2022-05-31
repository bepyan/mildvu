import Header from '@components/Header';
import { cls } from '@libs/client';
import Head from 'next/head';

export interface LayoutProps {
  className?: string;
  children?: React.ReactNode;
  title?: string;
  withoutHeader?: boolean;
  fullWidth?: boolean;
}

export default function Layout({
  className,
  children,
  title,
  withoutHeader,
}: LayoutProps) {
  return (
    <main className={cls('mx-auto flex  h-screen w-screen max-w-xl flex-col')}>
      <Head>
        <title>{!title ? 'Mildvu' : `${title} | Mildvu`}</title>
      </Head>

      {!withoutHeader && <Header />}
      <div className={cls('flex flex-1 flex-col', className)}>{children}</div>
    </main>
  );
}
