import { getDummyContent } from '@libs/client';
import { ContentWithLinker } from '@types';
import { useState } from 'react';

export const useEditorState = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [contentList, setContentList] = useState<ContentWithLinker[]>([
    getDummyContent(0),
  ]);

  return { currentIndex, setCurrentIndex, contentList, setContentList };
};

export type EditorState = ReturnType<typeof useEditorState>;
