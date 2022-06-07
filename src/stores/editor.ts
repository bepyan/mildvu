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

export const useLinkerEditorState = () => {
  const [{ contentList, currentIndex }, setState] = useRecoilState(editorState);

  return {
    linkers: contentList[currentIndex].linkers,
    setLinkers: (linkers: Linker[]) => {
      setState({
        currentIndex,
        contentList: contentList.map((v, i) =>
          i === currentIndex ? { ...v, linkers } : { ...v },
        ),
      });
    },
  };
};

const dummyLinker: Linker = {
  id: 0,
  contentId: 0,
  startX: 0,
  endX: 0,
  startY: 0,
  endY: 0,
  linkURL: '',
};

export const useLinkerEditor = () => {
  const { linkers, setLinkers } = useLinkerEditorState();

  return {
    addNewLinker: () => {
      setLinkers([...linkers, dummyLinker]);
    },
    deleteLinker: (index: number) => {
      setLinkers(linkers.filter((_, i) => i !== index));
    },
    editLinker: (index: number, linker: Linker) => {
      setLinkers(linkers.map((v, i) => (i === index ? linker : v)));
    },
  };
};
