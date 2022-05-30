import Button from '@components/Button';
import Carousel from '@components/Carousel';
import FileInput from '@components/FileInput';
import Layout from '@components/Layout';
import { cls, stopPropagationClick } from '@libs/client';
import { ContentWithButton } from '@types';
import { useEffect, useState } from 'react';

const getDummyContent = (index: number) => {
  return {
    id: 0,
    index,
    magazineId: 0,
    imageURL: '',
    buttons: [],
  };
};

export default () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [preview, setPreview] = useState('');
  const [contentList, setContentList] = useState<ContentWithButton[]>([
    getDummyContent(0),
  ]);

  const selectContent = (index: number) => {
    setCurrentIndex(index);
  };

  const addNewContent = () => {
    setContentList((list) => [...list, getDummyContent(contentList.length)]);
    setCurrentIndex(contentList.length);
  };

  const deleteContent = (index: number) => {
    if (contentList.length <= 1) return;

    const isLastIndex = index === contentList.length - 1;
    if (isLastIndex) setCurrentIndex(index - 1);

    setContentList(contentList.filter((_, i) => i !== index));
  };

  useEffect(() => {
    const newContentList = [...contentList];
    newContentList[currentIndex].imageURL = preview;
    setContentList(newContentList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preview]);

  return (
    <Layout title="만들기">
      <Carousel contentList={contentList} />

      <div className="pb-8">
        {/* preview list */}
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
                  className="absolute left-4 -top-10 h-8 w-8 bg-slate-500"
                />
              )}
              <div draggable={true} className="h-full w-full bg-stone-400">
                {content.imageURL && (
                  <img src={content.imageURL} alt="preview" className="h-full w-full" />
                )}
              </div>
            </div>
          ))}
          <div
            onClick={addNewContent}
            className="h-16 w-16 cursor-pointer bg-stone-200"
          />
        </div>
        <div className="py-4">
          <FileInput setPreview={setPreview} />
        </div>
        <Button onClick={() => console.log(contentList)}>저장</Button>
      </div>
    </Layout>
  );
};
