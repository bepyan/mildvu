import Layout from '@components/Layout';

export default () => {
  return (
    <Layout>
      <div className="absolute inset-x-0 top-1/4 space-y-2 text-center">
        <div className="mx-auto w-[213px] select-none">
          <img src="https://static.toss.im/assets/error/404@3x.png" alt="404 Not Found" />
        </div>
        <div className="text-4xl font-bold text-purple-500">404 ERROR</div>
        <div className="text-purple-400">요청하신 페이지를 찾을 수 없습니다.</div>
      </div>
    </Layout>
  );
};
