import { Button, Layout } from '@components';
import { useLogout } from '@hooks';

export default () => {
  const logout = useLogout();

  return (
    <Layout>
      <div className="text-center">
        <h1 className="text-5xl font-bold text-purple-500">Mildvu</h1>
      </div>

      <Button kind="secondary" size="normal" {...logout}>
        로그아웃
      </Button>
    </Layout>
  );
};
