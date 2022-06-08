import Layout from '@components/Layout';
import _prisma from '_prisma';
import { User } from '@prisma/client';
import { MagazineWithContent, SSGProps } from '@types';
import { GetStaticPaths, GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router';

export const getStaticPaths: GetStaticPaths = async () => {
  const users = await _prisma.user.findMany({
    select: { publishKey: true },
  });

  return {
    paths: users.map((v) => `/@${v.publishKey}`),
    fallback: false,
  };
};

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  const publishKey = (params!.publishKey + '').substring(1);

  const user = await _prisma.user.findUnique({ where: { publishKey } });
  if (!user) {
    return {
      redirect: {
        permanent: true,
        destination: '/login',
      },
    };
  }

  const magazines = await _prisma.magazine.findMany({
    where: { userId: user.id },
    include: { contents: true },
  });

  return {
    props: {
      user: JSON.parse(JSON.stringify(user)) as User,
      magazines: JSON.parse(JSON.stringify(magazines)) as MagazineWithContent[],
    },
  };
};

export default ({ user, magazines }: SSGProps<typeof getStaticProps>) => {
  return (
    <Layout title={user.publishKey} className="relative h-full px-4 pt-32">
      <div className="mt-12">
        {!magazines.length ? (
          <div>생성한 매거진이 없습니다.</div>
        ) : (
          magazines.map((v) => <div key={v.id}>{v.createdAt.toLocaleString()}</div>)
        )}
      </div>
    </Layout>
  );
};
