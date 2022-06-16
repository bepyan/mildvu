import { useMutation } from '@hooks';
import { getCurrentDate, getDummyContent, hash, previewToFile } from '@libs/client';
import { uploadImage } from '@libs/_firebase';
import { Linker, Magazine, User } from '@prisma/client';
import { ContentWithLinker } from '@types';
import { useRouter } from 'next/router';
import { atom, useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';

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

interface UploadEditorState {
  show: boolean;
  loading: boolean;
}

export const uploadEditorState = atom<UploadEditorState>({
  key: 'uploadEditorState',
  default: { show: false, loading: false },
});

let uploadImgs: { [key: string]: number } = {};

export const useUploadEditorState = () => {
  const [{ show, loading }, setState] = useRecoilState(uploadEditorState);

  return {
    show,
    loading,
    imageList: Object.keys(uploadImgs).map((key) => ({
      name: key,
      progress: uploadImgs[key],
    })),
    open: () => {
      uploadImgs = {};
      setState({ show: true, loading: true });
    },
    close: () => {
      setState({ show: false, loading: false });
    },
    setLoading: (loading: boolean) => {
      setState({ show: true, loading });
    },
    updateImage: (image: string, progress: number) => {
      uploadImgs[image] = progress;
      setState({ show: true, loading: true });
    },
  };
};

// ----------------------------------------------------------------

export const useCreateContent = (user: User) => {
  const router = useRouter();
  const { contentList } = useRecoilValue(editorState);
  const reset = useResetRecoilState(editorState);
  const { open, close, updateImage, setLoading } = useUploadEditorState();

  const { mutate, ...rest } = useMutation<{ magazine: Magazine }>({
    method: 'POST',
    url: '/api/magazines/create',
    onSuccess: ({ magazine }) => {
      setLoading(false);
      setTimeout(() => {
        router.push(`/@${user.publishKey}/${magazine.id}`);
        reset();
        close();
      }, 3000);
    },
  });

  return {
    ...rest,
    create: async () => {
      open();

      const uploadedContentList = await Promise.all(
        contentList.map(async (content, i) => {
          const isLocalImage = content.imageURL.startsWith('blob');
          if (!isLocalImage) return content;

          const file = await previewToFile({
            preview: content.imageURL,
            fileName: `${user.publishKey}/${getCurrentDate()}-${i}-${hash(
              content.imageURL,
            )}`,
          });
          if (!file) {
            alert('파일 업로드에 오류가 발생했습니다.');
            return content;
          }

          const url = await uploadImage({
            file,
            onProgress: (name, progress) => {
              updateImage(name, progress);
            },
          });
          return { ...content, imageURL: url };
        }),
      );

      await mutate({
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
  startX: 10,
  endX: 90,
  startY: 85,
  endY: 95,
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
