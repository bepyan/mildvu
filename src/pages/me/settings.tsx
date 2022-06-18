import Button from '@components/Button';
import Input from '@components/Input';
import Layout from '@components/Layout';
import { useMutation } from '@hooks';
import { withUserSessionSSR } from '@middlewares';
import { SSRProps } from '@types';
import { useForm } from 'react-hook-form';

export const getServerSideProps = withUserSessionSSR(async ({ user }) => {
  return {
    props: { user },
  };
});

interface SettingForm {
  desc: string;
}

export default ({ user }: SSRProps<typeof getServerSideProps>) => {
  const settingForm = useForm<SettingForm>({
    defaultValues: { desc: user.desc ?? '' },
  });

  const { mutate } = useMutation({
    url: '/api/users/me',
    method: 'PUT',
    onSuccess: () => {
      alert('계정 설명이 수정되었습니다.');
    },
  });

  const onSubmit = settingForm.handleSubmit((form) => {
    mutate(form);
  });

  return (
    <Layout title="설정">
      <div className="mt-4 flex items-end rounded-xl p-6 ring-1 ring-purple-300">
        <div>
          <h1 className="text-xl font-bold text-purple-500">{user.name}</h1>
          <span>{user.publishKey}</span>
        </div>
      </div>

      <div className="mt-8">
        <div>
          <div className="mb-2 text-gray-700">설명</div>
          <Input name="desc" register={settingForm.register('desc')} />
        </div>

        <Button className="mt-8" onClick={onSubmit}>
          수정
        </Button>
      </div>
    </Layout>
  );
};
