import Button from '@components/Button';
import {
  EditorCarousel,
  ImageLoader,
  LinkerEditorList,
  PreviewList,
  EditorUploadModal,
} from '@components/Editor';
import Layout from '@components/Layout';
import { withUserSessionSSR } from '@middlewares';
import { useCreateContent } from '@stores/editor';
import { SSRProps } from '@types';

export const getServerSideProps = withUserSessionSSR(({ user }) => {
  return {
    props: { user },
  };
});

export default ({ user }: SSRProps<typeof getServerSideProps>) => {
  const { create } = useCreateContent(user);

  return (
    <Layout title="만들기" className="relative">
      <EditorCarousel />

      <div className="absolute left-60 flex h-full w-5/6 flex-col pb-8">
        <PreviewList />
        <ImageLoader className="py-4" />
        <LinkerEditorList />

        <div className="mt-auto">
          <Button onClick={create}>저장</Button>
        </div>
      </div>

      <EditorUploadModal />
    </Layout>
  );
};
