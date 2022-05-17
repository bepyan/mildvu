import { SSGProps } from '@types';
import { GetStaticPropsContext } from 'next';

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  const publishKey = (params!.publishKey + '').substring(1);
  const magazineId = params!.id + '';

  return {
    props: {},
  };
};

export default ({}: SSGProps<typeof getStaticProps>) => {
  return <div className="mt-32 px-4"></div>;
};
