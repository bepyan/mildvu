import { ContentWithLinker } from '@types';
import React from 'react';

export const cls = (...classnames: any[]) => {
  return classnames.filter((v) => !!v).join(' ');
};

export const stopPropagationClick = (fn: any) => {
  return (e: React.MouseEvent) => {
    e.stopPropagation();
    fn?.();
  };
};

export const getDummyContent = (index: number): ContentWithLinker => {
  return {
    id: 0,
    index,
    magazineId: 0,
    imageURL: '',
    linkers: [],
  };
};
