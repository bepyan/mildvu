import { getDummyContent } from '@libs/client';
import { Linker } from '@prisma/client';
import { ContentWithLinker } from '@types';
import { atom, useRecoilState, useRecoilValue } from 'recoil';

interface EditorState {
  currentIndex: number;
  contentList: ContentWithLinker[];
}

export const editorState = atom<EditorState>({
  key: 'editorState',
  default: { currentIndex: 0, contentList: [getDummyContent(0)] },
});

export const useEditorState = () => {
  const state = useRecoilValue(editorState);
  return state;
};

// ----------------------------------------------------------------

export const usePreviewList = () => {
  const [{ contentList, currentIndex }, setState] = useRecoilState(editorState);

  return {
    addNewContent: () => {
      setState({
        contentList: [...contentList, getDummyContent(contentList.length)],
        currentIndex: contentList.length,
      });
    },
    deleteContent: (index: number) => {
      if (contentList.length <= 1) return;

      const isLastIndex = index === contentList.length - 1;

      setState({
        contentList: contentList.filter((_, i) => i !== index),
        currentIndex: isLastIndex ? index - 1 : currentIndex,
      });
    },
    selectContent: (index: number) => {
      setState((state) => ({
        ...state,
        currentIndex: index,
      }));
    },
  };
};

// ----------------------------------------------------------------

export const useLinkerEditor = () => {
  const [{ contentList, currentIndex }, setState] = useRecoilState(editorState);

  const setContentList = (fn: (list: ContentWithLinker[]) => ContentWithLinker[]) => {
    setState({
      currentIndex,
      contentList: fn([...contentList]),
    });
  };

  return {
    addNewLinker: () => {
      setContentList((list) => {
        list[currentIndex] = {
          ...list[currentIndex],
          linkers: [
            ...list[currentIndex].linkers,
            { id: 0, contentId: 0, startX: 0, endX: 0, startY: 0, endY: 0, linkURL: '' },
          ],
        };
        return list;
      });
    },
    deleteLinker: (index: number) => {
      setContentList((list) => {
        list[currentIndex] = {
          ...list[currentIndex],
          linkers: list[currentIndex].linkers.filter((_, i) => i !== index),
        };
        return list;
      });
    },
    editLinker: (index: number, linker: Linker) => {
      setContentList((list) => {
        const targetLinkerList = [...list[currentIndex].linkers];
        targetLinkerList[index] = linker;

        list[currentIndex] = {
          ...list[currentIndex],
          linkers: targetLinkerList,
        };
        return list;
      });
    },
  };
};
