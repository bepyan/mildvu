import _prisma from '_prisma';
import Layout from '@components/Layout';
import { MagazineWithContent, SSRProps } from '@types';
import { GetServerSidePropsContext } from 'next';
import Carousel from '@components/Carousel';

export const getServerSideProps = async ({ params }: GetServerSidePropsContext) => {
  const publishKey = (params!.publishKey + '').substring(1);
  const magazineId = params!.id + '';

  const magazine = await _prisma.magazine.findUnique({
    where: {
      id: +magazineId,
    },
    include: {
      contents: {
        include: {
          linkers: true,
        },
      },
    },
  });
  if (!magazine)
    return {
      redirect: {
        permanent: true,
        destination: '/404',
      },
    };

  return {
    props: {
      publishKey,
      magazine: JSON.parse(JSON.stringify(magazine)) as MagazineWithContent,
    },
  };
};

export default ({ publishKey, magazine }: SSRProps<typeof getServerSideProps>) => {
  return (
    <Layout title={publishKey} withoutHeader>
      <Carousel contentList={magazine.contents} />
    </Layout>
  );
};
