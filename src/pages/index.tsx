import { Button, Layout, SEO } from '@components';
import { useLogout } from '@hooks';
import type { NextPage } from 'next';

const Page: NextPage = () => {
  const logout = useLogout();

  return (
    <Layout className="mt-32 space-y-4 px-4">
      <SEO title="Login" />

      <div className="text-center">
        <h1 className="text-5xl font-bold text-purple-500">Mildvu</h1>
      </div>

      <Button kind="secondary" size="normal" {...logout}>
        로그아웃
      </Button>
    </Layout>
  );
};

export default Page;
