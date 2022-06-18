import { ChevronLeftIcon } from '@heroicons/react/outline';
import { cls } from '@libs/client';
import { useEffect, useState } from 'react';

export default function MagazineViewWrapper() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggle = () => setVisible((state) => !state);

    document.addEventListener('click', toggle);
    return () => document.removeEventListener('click', toggle);
  }, []);

  return (
    <div className={cls(!visible && 'hidden')}>
      <header className="absolute top-0 flex w-full bg-gray-700 p-4 text-white">
        <ChevronLeftIcon width={32} />
      </header>

      <footer className="absolute bottom-0 flex w-full flex-col bg-purple-700 p-4 text-white">
        <div></div>
      </footer>
    </div>
  );
}
