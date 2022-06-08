import Button from '@components/Button';
import FileInput from '@components/FileInput';
import Layout from '@components/Layout';
import { uploadImage } from '@libs/_firebase';
import { useState } from 'react';

export default () => {
  const [preview, setPreview] = useState('');
  const [file, setFile] = useState<File>();

  const upload = () => {
    if (!file) return;

    uploadImage({ file });
  };

  return (
    <Layout title="테스트">
      <div className="space-y-4">
        {preview}

        <FileInput setPreview={setPreview} setFile={setFile} />
        <Button onClick={upload}>업로드 테스트</Button>
      </div>
    </Layout>
  );
};
