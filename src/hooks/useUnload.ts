import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export const useUnload = (beforeUnload: () => void, afterUnload = () => {}) => {
  const [confirmUrl, setConfirmUrl] = useState('');
  const router = useRouter();

  useEffect(() => {
    const onRouteChange = (url: string) => {
      if (confirmUrl) return;

      beforeUnload();
      setConfirmUrl(url);
      router.events.emit('routeChangeError');
      throw `routeChange aborted. This error can be safely ignored - https://github.com/zeit/next.js/issues/2476.`;
    };

    router.events.on('routeChangeStart', onRouteChange);
    router.events.on('beforeHistoryChange', afterUnload);
    return () => {
      router.events.off('routeChangeStart', onRouteChange);
      router.events.off('beforeHistoryChange', afterUnload);
    };
  }, [confirmUrl, beforeUnload, afterUnload]);

  return {
    confirmUnoad: () => {
      router.push(confirmUrl);
    },
    cancelUnload: () => {
      setConfirmUrl('');
    },
  };
};
