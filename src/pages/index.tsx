import { Button } from '@components';
import type { NextPage } from 'next';
import useSWR from 'swr';

const Page: NextPage = () => {
  const { data, error, mutate } = useSWR('/api/test');

  return (
    <div className="mt-32 px-4">
      <Button onClick={mutate} loading={!data}>
        Test
      </Button>
    </div>
  );
};

export default Page;
