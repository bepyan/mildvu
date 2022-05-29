import _prisma from '_prisma';
import Layout from '@components/Layout';
import Link from 'next/link';

export default () => {
  return (
    <Layout>
      <Link href="/preview">preview 보기</Link>
      <div className="mt-4">content</div>
    </Layout>
  );
};
