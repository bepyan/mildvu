import Carousel from '@components/Carousel';
import { useEditorState } from '@stores/editor';

export function EditorCarousel() {
  const { contentList } = useEditorState();

  return (
    <div className="absolute -left-40 h-full">
      <Carousel isDebug contentList={contentList} className="h-[720px] w-[360px]" />
    </div>
  );
}
