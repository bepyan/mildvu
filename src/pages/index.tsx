import _prisma from '_prisma';
import Layout from '@components/Layout';
import useSWR from 'swr';
import MagazineItem from '@components/MagazineItem';
import { User } from '@prisma/client';
import { MagazineWithContent } from '@types';

export default () => {
  const { data, isValidating } = useSWR<{
    magazines: (MagazineWithContent & { user: User })[];
  }>(`/api/magazines`);

  return (
    <Layout>
      <div className="mt-4">
        {isValidating ? (
          <>
            <div>로딩중...</div>
          </>
        ) : data?.magazines.length ? (
          <>
            <div>총 {data.magazines.length}개의 메거진이 있습니다.</div>
            <div className="mt-4">
              {data.magazines.map((v) => (
                <MagazineItem key={v.id} item={v} />
              ))}
            </div>
          </>
        ) : (
          <div>생성한 매거진이 없습니다.</div>
        )}
      </div>
    </Layout>
  );
};
