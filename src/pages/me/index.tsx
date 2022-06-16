import _prisma from '_prisma';
import Button from '@components/Button';
import Layout from '@components/Layout';
import { withUserSessionSSR } from '@middlewares';
import { MagazineWithContent, SSRProps } from '@types';
import { useRouter } from 'next/router';
import { User } from '@prisma/client';
import { getFullDate } from '@libs/client';

export const getServerSideProps = withUserSessionSSR(async ({ user }) => {
  const magazines = await _prisma.magazine.findMany({
    where: { userId: user.id },
    include: { contents: true },
  });

  return {
    props: JSON.parse(
      JSON.stringify({
        user,
        magazines: magazines.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        ),
      }),
    ) as {
      user: User;
      magazines: MagazineWithContent[];
    },
  };
});

export default ({ user, magazines }: SSRProps<typeof getServerSideProps>) => {
  const router = useRouter();

  const navToCreate = () => router.push('/me/create');
  const navToMyMagazine = () => router.push(`/@${user.publishKey}`);
  const navToMagazine = (id: number) => router.push(`/@${user.publishKey}/${id}`);

  return (
    <Layout title="대시보드" className="relative">
      <div className="mt-4 flex items-end rounded-xl p-6 ring-1 ring-purple-300">
        <div>
          <h1 className="text-xl font-bold text-purple-500">{user.name}</h1>
          <span>{user.publishKey}</span>
        </div>
        <div className="ml-auto flex items-end space-x-2">
          <Button kind="secondary" size="normal" onClick={navToMyMagazine}>
            내 매거진
          </Button>
          <Button size="normal">설정</Button>
        </div>
      </div>

      <div className="mb-24 mt-8">
        {!magazines.length ? (
          <div>생성한 매거진이 없습니다.</div>
        ) : (
          magazines.map((v) => (
            <div
              key={v.id}
              className="flex cursor-pointer items-center rounded-md p-4 text-stone-700 hover:bg-stone-100"
              onClick={() => navToMagazine(v.id)}
            >
              <span className="text-lg">매거진</span>
              <div className="ml-4">{getFullDate(v.createdAt)}</div>
            </div>
          ))
        )}
      </div>

      <div className="fixed inset-x-0 bottom-8 mx-auto max-w-xl">
        <Button onClick={navToCreate}>매거진 생성하기</Button>
      </div>
    </Layout>
  );
};
