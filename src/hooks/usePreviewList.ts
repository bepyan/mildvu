import { getDummyContent } from '@libs/client';
import { EditorState } from './useEditorState';

export const usePreviewList = ({
  contentList,
  currentIndex,
  setContentList,
  setCurrentIndex,
}: EditorState) => {
  return {
    contentList,
    currentIndex,
    addNewContent: () => {
      setContentList((list) => [...list, getDummyContent(contentList.length)]);
      setCurrentIndex(contentList.length);
    },
    deleteContent: (index: number) => {
      if (contentList.length <= 1) return;

      const isLastIndex = index === contentList.length - 1;
      if (isLastIndex) setCurrentIndex(index - 1);

      setContentList(contentList.filter((_, i) => i !== index));
    },
    selectContent: (index: number) => {
      setCurrentIndex(index);
    },
  };
};
