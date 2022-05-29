import _prisma from '_prisma';
import Button from '@components/Button';
import Layout from '@components/Layout';
import { useLogout } from '@hooks';
import { withSessionSSR } from '@middlewares';
import { SSRProps } from '@types';
import { useRouter } from 'next/router';
import Header from '@components/Header';

export const getServerSideProps = withSessionSSR(({ req }) => {
  const user = req.session.user;

  return {
    props: { user },
  };
});

export default ({ user }: SSRProps<typeof getServerSideProps>) => {
  const logout = useLogout();
  const router = useRouter();

  const navToLogin = () => router.push('/login');

  return (
    <Layout>
      <Header user={user} />
      <div className="mt-4">content</div>
    </Layout>
  );
};
