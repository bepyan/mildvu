import Button from '@components/Button';
import Carousel from '@components/Carousel';
import FileInput from '@components/FileInput';
import Input from '@components/Input';
import Layout from '@components/Layout';
import PersentInput from '@components/PersentInput';
import { cls, stopPropagationClick } from '@libs/client';
import { Linker } from '@prisma/client';
import { ContentWithLinker } from '@types';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const getDummyContent = (index: number) => {
  return {
    id: 0,
    index,
    magazineId: 0,
    imageURL: '',
    linkers: [],
  };
};

export default () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [preview, setPreview] = useState('');
  const { register, watch } = useForm<Linker>();
  const ww = watch();
  const [contentList, setContentList] = useState<ContentWithLinker[]>([
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

  useEffect(() => {
    console.log(ww);
  }, [ww]);

  return (
    <Layout title="만들기" className="relative">
      <div className="border-1 absolute -left-40 h-full">
        <Carousel contentList={contentList} className="w-[360px]" />
      </div>

      <div className="absolute left-60 flex h-full w-5/6 flex-col pb-8">
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
                  className="absolute -top-4 -right-4  h-8 w-8 bg-slate-500"
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

        <div className="space-y-2 rounded-xl p-6 ring-1 ring-purple-300">
          <div className="flex space-x-4">
            <PersentInput register={register('startX', { min: 0, max: 100 })} />
            <PersentInput register={register('endX', { min: 0, max: 100 })} />
          </div>
          <div className="flex space-x-4">
            <PersentInput register={register('startY', { min: 0, max: 100 })} />
            <PersentInput register={register('endY', { min: 0, max: 100 })} />
          </div>
          <Input register={register('linkURL')} />
        </div>

        <div className="mt-auto">
          <Button onClick={() => console.log(contentList)}>저장</Button>
        </div>
      </div>
    </Layout>
  );
};

const PreviewList = () => {};
