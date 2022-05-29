import '../styles/globals.css';
import { _axios } from '@libs/client';
import type { AppProps } from 'next/app';
import { SWRConfig } from 'swr';
import Head from 'next/head';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        fetcher: (url: string) => _axios.get(url).then((res) => res.data),
      }}
    >
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no"
        />
      </Head>
      <main className="mx-auto h-screen w-screen max-w-xl">
        <Component {...pageProps} />
      </main>
    </SWRConfig>
  );
}
