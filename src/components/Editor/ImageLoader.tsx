import FileInput from '@components/FileInput';
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

  return (
    <div className={className}>
      <FileInput setPreview={setPreview} />
    </div>
  );
}
