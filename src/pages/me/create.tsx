import Button from '@components/Button';
import Carousel from '@components/Carousel';
import LinkerEditor from '@components/Editor/LinkerEditor';
import PreviewList from '@components/Editor/PreviewList';
import FileInput from '@components/FileInput';
import Layout from '@components/Layout';
import { useEditorState, useLinkerEditor, usePreview, usePreviewList } from '@hooks';

export default () => {
  const state = useEditorState();
  const { contentList, currentIndex } = state;

  const previewListProps = usePreviewList(state);
  const { setPreview } = usePreview(state);
  const { addNewLinker, deleteLinker, editLinker } = useLinkerEditor(state);

  return (
    <Layout title="만들기" className="relative">
      <div className="border-1 absolute -left-40 h-full">
        <Carousel isDebug contentList={contentList} className="w-[360px]" />
      </div>

      <div className="absolute left-60 flex h-full w-5/6 flex-col pb-8">
        <PreviewList {...previewListProps} />

        <div className="py-4">
          <FileInput setPreview={setPreview} />
        </div>

        <div className="space-y-4">
          {contentList[currentIndex].linkers.map((linker, i) => {
            return (
              <LinkerEditor
                key={i}
                linker={linker}
                setLinker={(newLinker) => editLinker(i, newLinker)}
                deleteLinker={() => deleteLinker(i)}
              />
            );
          })}

          <Button onClick={addNewLinker}>Linker 추가하기</Button>
        </div>

        <div className="mt-auto">
          <Button onClick={() => console.log(contentList)}>저장</Button>
        </div>
      </div>
    </Layout>
  );
};
