import Button from '@components/Button';
import { useLinkerEditor, useLinkerEditorState } from '@stores/editor';
import { LinkerEditor } from './LinkerEditor';

export function LinkerEditorList() {
  const { linkers } = useLinkerEditorState();
  const { addNewLinker, editLinker, deleteLinker } = useLinkerEditor();

  return (
    <div className="space-y-4">
      {linkers.map((linker, i) => {
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
