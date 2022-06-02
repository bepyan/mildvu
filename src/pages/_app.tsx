import '../styles/globals.css';
import { _axios } from '@libs/client';
import type { AppProps } from 'next/app';
import { SWRConfig } from 'swr';
import Head from 'next/head';
import { RecoilRoot } from 'recoil';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <SWRConfig
        value={{
          fetcher: (url: string) => _axios.get(url).then((res) => res.data),
          revalidateOnFocus: false,
        }}
      >
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no"
          />
        </Head>

        <Component {...pageProps} />
      </SWRConfig>
    </RecoilRoot>
  );
}

export default MyApp;
