import { useEffect, useState } from 'react';

export const useWidth = (ref: React.RefObject<HTMLDivElement>) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      console.log('width');
      setWidth(ref.current?.offsetWidth || 0);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('load', handleResize, { once: true });
    return () => window.removeEventListener('resize', handleResize);
  }, [ref]);

  return width;
};
