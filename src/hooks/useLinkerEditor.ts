import { Linker } from '@prisma/client';
import { EditorState } from './useEditorState';

export const useLinkerEditor = ({
  contentList,
  currentIndex,
  setContentList,
}: EditorState) => {
  return {
    addNewLinker: () => {
      const newContentList = [...contentList];
      newContentList[currentIndex].linkers = [
        ...newContentList[currentIndex].linkers,
        { id: 0, contentId: 0, startX: 0, endX: 0, startY: 0, endY: 0, linkURL: '' },
      ];
      setContentList(newContentList);
    },
    deleteLinker: (index: number) => {
      const newContentList = [...contentList];

      console.log(index);
      console.log('before >>> ', newContentList[currentIndex].linkers);
      const remian = newContentList[currentIndex].linkers.filter((_, i) => {
        console.log(i !== index, _);
        return i !== index;
      });
      console.log('after >>> ', remian);

      newContentList[currentIndex].linkers = remian;

      setContentList(newContentList);
    },
    editLinker: (index: number, linker: Linker) => {
      const newContentList = [...contentList];
      newContentList[currentIndex].linkers[index] = linker;
      setContentList(newContentList);
    },
  };
};
