import { cls } from '@libs/client';
import Head from 'next/head';

export interface LayoutProps {
  className?: string;
  children?: React.ReactNode;
  title?: string;
}

export default function Layout({ className, children, title }: LayoutProps) {
  return (
    <>
      <Head>
        <title>{!title ? 'Mildvu' : `${title} | Mildvu`}</title>
      </Head>

      <div className={cls('flex flex-1 flex-col', className)}>{children}</div>
    </>
  );
}
