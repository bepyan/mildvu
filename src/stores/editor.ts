import { useMutation } from '@hooks';
import { getDummyContent, previewToFile } from '@libs/client';
import { uploadImage } from '@libs/_firebase';
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

export const useCreateContent = () => {
  const { contentList } = useEditorState();

  const { mutate, ...rest } = useMutation({
    method: 'POST',
    url: '/api/magazines/create',
  });

  return {
    ...rest,
    create: async () => {
      const uploadedContentList = await Promise.all(
        contentList.map(async (content) => {
          const isLocalImage = content.imageURL.startsWith('blob');
          if (!isLocalImage) return content;

          const file = await previewToFile({ preview: content.imageURL });
          if (!file) {
            alert('파일 업로드에 오류가 발생했습니다.');
            return content;
          }

          const url = await uploadImage({
            file,
            onProgress: (progress) => {
              console.log(content.imageURL, progress);
            },
          });
          return { ...content, imageURL: url };
        }),
      );

      mutate({
        contentList: uploadedContentList.map((content, i) => ({
          id: undefined,
          magazineId: undefined,
          index: i,
          imageURL: content.imageURL,
          linkers: content.linkers.map((linker) => ({
            ...linker,
            id: undefined,
            contentId: undefined,
          })),
        })),
      });
    },
  };
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
