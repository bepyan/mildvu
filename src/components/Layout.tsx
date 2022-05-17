import { cls } from '@libs/client';
import Head from 'next/head';

export interface LayoutProps {
  className?: string;
  children?: React.ReactNode;
  title?: string;
}

export const Layout = ({ className, children, title }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{!title ? 'Mildvu' : `${title} | Mildvu`}</title>
      </Head>

      <div className={cls(className)}>{children}</div>
    </>
  );
};
