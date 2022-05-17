import { SSGPage } from '@types';
import { GetStaticPropsContext } from 'next';

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  const publishKey = (params!.publishKey + '').substring(1);
  const magazineId = params!.id + '';

  return {
    props: {},
  };
};

const Page: SSGPage<typeof getStaticProps> = ({}) => {
  return <div className="mt-32 px-4"></div>;
};

export default Page;
