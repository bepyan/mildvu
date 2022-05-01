import { _axios } from '@libs/client';
import type { AppProps } from 'next/app';
import { SWRConfig } from 'swr';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        fetcher: (url: string) => _axios.get(url).then((res) => res.data),
      }}
    >
      <div className="mx-auto w-full max-w-xl">
        <Component {...pageProps} />
      </div>
    </SWRConfig>
  );
}

export default MyApp;
