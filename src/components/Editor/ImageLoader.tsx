import Button from '@components/Button';
import FileInput from '@components/FileInput';
import { cls } from '@libs/client';
import { editorState } from '@stores/editor';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

export function ImageLoader({ className = '' }) {
  const [{ contentList, currentIndex }, setState] = useRecoilState(editorState);
  const [preview, setPreview] = useState('');

  useEffect(() => {
    const newContentList = [...contentList];

    newContentList[currentIndex] = {
      ...newContentList[currentIndex],
      imageURL: preview,
    };

    setState({
      currentIndex,
      contentList: newContentList,
    });
  }, [preview]);

  const removePreview = () => {
    setPreview('');
  };

  return (
    <div className={cls(className, 'flex space-x-2')}>
      <FileInput className="flex-1" setPreview={setPreview} />
      <div>
        <Button kind="secondary" onClick={removePreview}>
          제거
        </Button>
      </div>
    </div>
  );
}
