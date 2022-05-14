import Head from 'next/head';

export interface SEOProps {
  title?: string;
}

export const SEO = ({ title }: SEOProps) => {
  return (
    <Head>
      <title>{!title ? 'Mildvu' : `${title} | Mildvu`}</title>
    </Head>
  );
};
