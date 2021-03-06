import Button from '@components/Button';
import Input from '@components/Input';
import Layout from '@components/Layout';
import { useMutation } from '@hooks';
import { withRestrictSesstionSSR } from '@middlewares';
import { User } from '@prisma/client';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

export const getServerSideProps = withRestrictSesstionSSR();

type LoginForm = Pick<User, 'publishKey' | 'password'>;

export default () => {
  const router = useRouter();
  const navToRegister = () => router.push('/register');

  const loginForm = useForm<LoginForm>();
  const loginMutation = useMutation({
    url: '/api/users/login',
    onSuccess: () => router.replace(`/me`),
  });

  const onSubmitLogin = loginForm.handleSubmit((form) => {
    if (loginMutation.loading) return;

    loginMutation.mutate(form);
  });

  useEffect(() => {
    const subscription = loginForm.watch(() => {
      if (loginMutation.error) loginMutation.reset();
    });

    return subscription.unsubscribe;
  }, [loginForm.watch]);

  return (
    <Layout withoutHeader title="로그인" className="mt-32 space-y-4 px-4">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-purple-500">Mildvu</h1>
      </div>

      <form className="space-y-4" onSubmit={onSubmitLogin}>
        <Input
          register={loginForm.register('publishKey', { required: true })}
          label="아이디"
          autoFocus
          required
        />
        <Input
          register={loginForm.register('password', { required: true })}
          type="password"
          label="비밀번호"
          required
        />
        {loginMutation.error && (
          <p className="text-red-600">{loginMutation.error.message}</p>
        )}
        <Button type="submit" loading={loginMutation.loading}>
          로그인
        </Button>
        <Button type="button" kind="outline" onClick={navToRegister}>
          회원가입
        </Button>
      </form>
    </Layout>
  );
};
