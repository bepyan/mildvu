import Button from '@components/Button';
import {
  EditorCarousel,
  ImageLoader,
  LinkerEditorList,
  PreviewList,
} from '@components/Editor';
import Layout from '@components/Layout';
import { editorState } from '@stores/editor';
import { useState } from 'react';
import { useResetRecoilState } from 'recoil';
import { useUnload } from '@hooks';
import Confirm from '@components/Confirm';

export default () => {
  const [show, setShow] = useState(false);

  const openModal = () => setShow(true);
  const reset = useResetRecoilState(editorState);
  const { cancelUnload, confirmUnoad } = useUnload(openModal, reset);

  const cancelModal = () => {
    setShow(false);
    cancelUnload();
  };
  const confirmModal = () => {
    setShow(false);
    confirmUnoad();
  };

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

      <Confirm
        title="임시저장 하시겠습니까?"
        show={show}
        backdrop={cancelModal}
        cancel={cancelModal}
        confirm={confirmModal}
      />
    </Layout>
  );
};
