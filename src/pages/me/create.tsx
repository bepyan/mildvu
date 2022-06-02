import Button from '@components/Button';
import {
  EditorCarousel,
  ImageLoader,
  LinkerEditorList,
  PreviewList,
} from '@components/Editor';
import Layout from '@components/Layout';

export default () => {
  return (
    <Layout title="만들기" className="relative">
      <EditorCarousel />

      <div className="absolute left-60 flex h-full w-5/6 flex-col pb-8">
        <PreviewList />
        <ImageLoader className="py-4" />
        <LinkerEditorList />

        <div className="mt-auto">
          <Button onClick={() => console.log('')}>저장</Button>
        </div>
      </div>
    </Layout>
  );
};
