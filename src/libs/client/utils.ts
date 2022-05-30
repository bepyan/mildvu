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
