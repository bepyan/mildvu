import { XCircleIcon } from '@heroicons/react/solid';
import { cls, stopPropagationClick } from '@libs/client';
import { useEditorState, usePreviewList } from '@stores/editor';

export function PreviewList() {
  const { contentList, currentIndex } = useEditorState();
  const { addNewContent, deleteContent, selectContent } = usePreviewList();

  return (
    <div className="flex space-x-3">
      {contentList.map((content, i) => (
        <div
          key={i}
          onClick={() => selectContent(i)}
          className={cls(
            'relative h-16 w-16 cursor-pointer',
            i === currentIndex && 'ring-4 ring-purple-500 ring-offset-2',
          )}
        >
          {i === currentIndex && (
            <div
              draggable={false}
              onClick={stopPropagationClick(() => deleteContent(i))}
              className="absolute inset-4 z-50 h-8 w-8 text-purple-700 hover:text-purple-500"
            >
              <XCircleIcon />
            </div>
          )}
          <div draggable={true} className="h-full w-full bg-stone-400">
            {content.imageURL && (
              <img
                src={content.imageURL}
                alt="preview"
                className="h-full w-full object-cover"
              />
            )}
          </div>
        </div>
      ))}
      <div onClick={addNewContent} className="h-16 w-16 cursor-pointer bg-stone-200" />
    </div>
  );
}
