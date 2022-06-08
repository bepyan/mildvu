import Layout from '@components/Layout';
import { SSRProps } from '@types';
import { GetServerSidePropsContext } from 'next';

export const getServerSideProps = async ({ params }: GetServerSidePropsContext) => {
  const publishKey = (params!.publishKey + '').substring(1);
  const magazineId = params!.id + '';

  return {
    props: { publishKey, magazineId },
  };
};

export default ({ publishKey, magazineId }: SSRProps<typeof getServerSideProps>) => {
  return (
    <Layout title={publishKey} className="mt-32 px-4">
      {magazineId}
    </Layout>
  );
};
