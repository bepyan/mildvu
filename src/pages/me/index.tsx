import _prisma from '_prisma';
import Button from '@components/Button';
import Layout from '@components/Layout';
import { useLogout } from '@hooks';
import { withUserSesstionSSR } from '@middlewares';
import { SSRProps } from '@types';

export const getServerSideProps = withUserSesstionSSR(async ({ user }) => {
  const magazines = await _prisma.magazine.findMany({
    where: { userId: user.id },
    include: { content: true },
  });

  return {
    props: { user, magazines },
  };
});

export default ({ user, magazines }: SSRProps<typeof getServerSideProps>) => {
  const logout = useLogout();

  return (
    <Layout title="대시보드" className="relative h-full px-4 pt-32">
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

      <div className="absolute inset-x-4 bottom-32">
        <Button>매거진 생성하기</Button>
      </div>
    </Layout>
  );
};
