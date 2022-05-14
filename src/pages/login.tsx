import { Button, Input, Layout, SEO } from '@components';
import { useMutation } from '@libs/client';
import { User } from '@prisma/client';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

type LoginForm = Pick<User, 'publishKey' | 'password'>;

const Page: NextPage = () => {
  const router = useRouter();
  const navToRegister = () => router.push('/register');

  const loginForm = useForm<LoginForm>();
  const loginMutation = useMutation({
    url: '/api/users/login',
    onSuccess: () => {
      router.replace('/dashboard');
    },
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
    <Layout className="mt-32 space-y-4 px-4">
      <SEO title="Login" />

      <div className="text-center">
        <h1 className="text-5xl font-bold text-purple-500">Mildvu</h1>
      </div>

      <form className="space-y-4" onSubmit={onSubmitLogin}>
        <Input
          register={loginForm.register('publishKey', { required: true })}
          label="아이디"
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
        <Button loading={loginMutation.loading}>로그인</Button>
        <Button kind="secondary" onClick={navToRegister}>
          회원가입
        </Button>
      </form>
    </Layout>
  );
};

export default Page;
