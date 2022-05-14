import { Button } from '@components';
import { useMutation } from '@libs/client';
import { withSessionSSR } from '@libs/server';
import { User } from '@prisma/client';
import { NextPage } from 'next';
import { useRouter } from 'next/router';

const Page: NextPage<{ user: User }> = ({ user }) => {
  const router = useRouter();

  const logoutMutation = useMutation({
    url: '/api/users/logout',
    onSuccess: () => {
      router.push('/login');
    },
  });

  return (
    <div className="mt-32 px-4">
      <div>
        <p>{user?.id}</p>
        <p>{user?.publishKey}</p>
        <p>{user?.name}</p>
      </div>

      <Button loading={logoutMutation.loading} onClick={logoutMutation.mutate}>
        로그아웃
      </Button>
    </div>
  );
};

export const getServerSideProps = withSessionSSR(async ({ req }) => {
  return {
    props: {
      user: req.session.user,
    },
  };
});

export default Page;
