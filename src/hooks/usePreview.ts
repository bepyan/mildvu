import { useEffect, useState } from 'react';
import { EditorState } from './useEditorState';

export const usePreview = ({
  contentList,
  currentIndex,
  setContentList,
}: EditorState) => {
  const [preview, setPreview] = useState('');

  useEffect(() => {
    const newContentList = [...contentList];
    newContentList[currentIndex].imageURL = preview;
    setContentList(newContentList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preview]);

  return {
    preview,
    setPreview,
  };
};
