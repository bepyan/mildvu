import _prisma from '_prisma';
import Button from '@components/Button';
import Layout from '@components/Layout';
import { withUserSessionSSR } from '@middlewares';
import { MagazineWithContent, SSRProps } from '@types';
import { useRouter } from 'next/router';
import MagazineMyItem from '@components/MagazineMyItem';
import useSWR from 'swr';

export const getServerSideProps = withUserSessionSSR(async ({ user }) => {
  return {
    props: { user },
  };
});

export default ({ user }: SSRProps<typeof getServerSideProps>) => {
  const router = useRouter();

  const { data } = useSWR<{ magazines: MagazineWithContent[] }>(
    '/api/users/me/magazines',
  );

  const navToCreate = () => router.push('/me/create');
  const navToMyMagazine = () => router.push(`/@${user.publishKey}`);

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
        {!data ? (
          <div>로딩중...</div>
        ) : !data.magazines.length ? (
          <div>생성한 매거진이 없습니다.</div>
        ) : (
          <>
            <div>총 {data.magazines.length}개의 메거진이 있습니다.</div>
            <div className="mt-4">
              {data.magazines.map((v) => (
                <MagazineMyItem key={v.id} item={{ ...v, user }} />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="fixed inset-x-0 bottom-8 mx-auto max-w-xl">
        <Button onClick={navToCreate}>매거진 생성하기</Button>
      </div>
    </Layout>
  );
};
