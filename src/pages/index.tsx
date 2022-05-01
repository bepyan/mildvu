import type { NextPage } from 'next';
import useSWR from 'swr';

const Home: NextPage = () => {
  const { data, error } = useSWR('/api/test');

  return (
    <div className="mt-32 px-4">
      <h1>Test</h1>
      <div>
        <h3>data</h3>
        {JSON.stringify(data)}
      </div>
      <div>
        <h3>error</h3>
        {JSON.stringify(error)}
      </div>
    </div>
  );
};

export default Home;
