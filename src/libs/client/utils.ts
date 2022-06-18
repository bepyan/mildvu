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

export const hash = (target: string) => {
  let code = 0;
  if (target.length === 0) return code;

  for (let i = 0; i < target.length; i++) {
    const chr = target.charCodeAt(i);
    code = (code << 5) - code + chr;
    code |= 0;
  }
  return code;
};

export const getCurrentDate = (date: Date = new Date()) => {
  return date.toLocaleString().substring(0, 10);
};

export const getFullDate = (date: Date = new Date()) => {
  return date.toLocaleString().substring(0, 19).replace('T', ' ');
};
