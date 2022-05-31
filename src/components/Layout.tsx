import Header from '@components/Header';
import { cls } from '@libs/client';
import Head from 'next/head';

export interface LayoutProps {
  withoutHeader?: boolean;
  className?: string;
  children?: React.ReactNode;
  title?: string;
}

export default function Layout({
  className,
  children,
  title,
  withoutHeader,
}: LayoutProps) {
  return (
    <>
      <Head>
        <title>{!title ? 'Mildvu' : `${title} | Mildvu`}</title>
      </Head>

      {!withoutHeader && <Header />}
      <div className={cls('flex flex-1 flex-col', className)}>{children}</div>
    </>
  );
}
