import { Button } from '@components';
import { useLogout } from '@hooks';
import { _prisma } from '@libs/server';
import { Magazine, User } from '@prisma/client';
import { withSessionSSR } from '@middlewares';
import { NextPage } from 'next';
import { useRouter } from 'next/router';

interface PageProps {
  user: User;
  magazines: Magazine[];
}

const Page: NextPage<PageProps> = ({ user, magazines }) => {
  const logout = useLogout();

  const router = useRouter();

  return (
    <div className="relative h-full px-4 pt-32">
      <div className="flex items-end">
        <div>
          <h1 className="text-xl font-bold text-purple-500">{user.name}</h1>
          <span>{user.publishKey}</span>
        </div>
        <div className="ml-auto">
          <Button kind="secondary" size="normal" {...logout}>
            로그아웃
          </Button>
        </div>
      </div>

      <div className="mt-12">
        {!magazines.length ? (
          <div>생성한 매거진이 없습니다.</div>
        ) : (
          magazines.map((v) => <div key={v.id}>{v.createdAt.toLocaleString()}</div>)
        )}
      </div>

      <div className="absolute bottom-32 w-full ">
        <Button>매거진 생성하기</Button>
      </div>
    </div>
  );
};

export const getServerSideProps = withSessionSSR(async ({ req }) => {
  const user = req.session.user;
  if (!user) {
    req.session.destroy();
    return {
      redirect: {
        destination: '/login',
        permanent: true,
      },
    };
  }

  const magazines = await _prisma.magazine.findMany({
    where: { userId: user.id },
    include: { content: true },
  });

  return {
    props: {
      user,
      magazines,
    },
  };
});

export default Page;
