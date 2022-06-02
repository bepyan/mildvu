import Button from '@components/Button';
import { useEditorState, useLinkerEditor } from '@stores/editor';
import { LinkerEditor } from './LinkerEditor';

export function LinkerEditorList() {
  const { contentList, currentIndex } = useEditorState();
  const { addNewLinker, deleteLinker, editLinker } = useLinkerEditor();

  return (
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
  );
}
