import Button from '@components/Button';
import FileInput from '@components/FileInput';
import Layout from '@components/Layout';
import { previewToFile } from '@libs/client';
import { uploadImage } from '@libs/_firebase';
import { useState } from 'react';

export default () => {
  const [preview, setPreview] = useState('');

  const upload = async () => {
    if (!preview) return;

    const file = await previewToFile({ preview });
    if (!file) return alert('파일 업로드에 오류가 발생했습니다.');

    uploadImage({
      file,
      onFinish: (url) => {
        window.open(url, '_blank');
      },
    });
  };

  const download = async () => {
    if (!preview) return;

    const file = await previewToFile({ preview });
    console.log(file);
  };

  return (
    <Layout title="이미지 업로드 테스트">
      <div className="space-y-4">
        {preview}

        <FileInput setPreview={setPreview} />
        <Button disabled={!preview} onClick={upload}>
          업로드 테스트
        </Button>
        <Button disabled={!preview} onClick={download}>
          다운로드
        </Button>
      </div>
    </Layout>
  );
};
