import { _prisma } from '@libs/server';
import { User } from '@prisma/client';
import { SSGProps } from '@types';
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
    include: { content: true },
  });

  return {
    props: {
      user: JSON.parse(JSON.stringify(user)) as User,
      magazines,
    },
  };
};

export default ({ user, magazines }: SSGProps<typeof getStaticProps>) => {
  const router = useRouter();

  return (
    <div className="relative h-full px-4 pt-32">
      <div className="flex items-end">
        <div>
          <h1 className="text-xl font-bold text-purple-500">{user.name}</h1>
          <span>{user.publishKey}</span>
        </div>
      </div>

      <div className="mt-12">
        {!magazines.length ? (
          <div>생성한 매거진이 없습니다.</div>
        ) : (
          magazines.map((v) => <div key={v.id}>{v.createdAt.toLocaleString()}</div>)
        )}
      </div>
    </div>
  );
};
