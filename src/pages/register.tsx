import Button from '@components/Button';
import Input from '@components/Input';
import Layout from '@components/Layout';
import { useMutation } from '@hooks';
import { withRestrictSesstionSSR } from '@middlewares';
import { User } from '@prisma/client';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

export const getServerSideProps = withRestrictSesstionSSR();

type RegisterForm = Pick<User, 'publishKey' | 'name' | 'password'>;

export default () => {
  const router = useRouter();
  const navToLogin = () => router.push('/login');

  const registerForm = useForm<RegisterForm>();
  const registerMutation = useMutation({
    url: '/api/users/register',
    onSuccess: () => {
      router.replace('/dashboard');
    },
  });

  const onSubmit = registerForm.handleSubmit((form) => {
    if (registerMutation.loading) return;

    registerMutation.mutate(form);
  });

  return (
    <Layout withoutHeader title="회원가입" className="mt-32 space-y-4 px-4">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-purple-500">Mildvu</h1>
      </div>

      <form className="space-y-4" onSubmit={onSubmit}>
        <Input
          register={registerForm.register('publishKey', { required: true })}
          label="아이디"
          autoFocus
          required
        />

        <Input
          register={registerForm.register('password', { required: true })}
          type="password"
          label="비밀번호"
          required
        />
        <Input
          register={registerForm.register('name', { required: true })}
          label="이름"
          required
        />
        {registerMutation.error && (
          <p className="text-red-600">{registerMutation?.error?.message}</p>
        )}
        <Button loading={registerMutation.loading}>회원가입</Button>
        <Button kind="outline" onClick={navToLogin}>
          로그인
        </Button>
      </form>
    </Layout>
  );
};
