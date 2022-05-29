import Button from '@components/Button';
import Layout from '@components/Layout';
import { useLogout } from '@hooks';
import { SSRProps } from '@types';
import type { GetServerSidePropsContext } from 'next';

export const getServerSideProps = ({}: GetServerSidePropsContext) => {
  return { props: { test: 'test' } };
};

export default ({ test }: SSRProps<typeof getServerSideProps>) => {
  const logout = useLogout();

  return (
    <Layout title="만들기" className="mt-32 space-y-4 px-4">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-purple-500">{test}</h1>
      </div>

      <Button kind="secondary" size="normal" {...logout}>
        로그아웃
      </Button>
    </Layout>
  );
};
