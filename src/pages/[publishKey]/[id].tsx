import { GetStaticProps, NextPage } from 'next';

const Page: NextPage = ({}) => {
  return <div className="mt-32 px-4"></div>;
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const publishKey = (params!.publishKey + '').substring(1);
  const magazineId = params!.id + '';

  return {
    props: {},
  };
};

export default Page;
