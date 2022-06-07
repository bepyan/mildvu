import { cls } from '@libs/client';
import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface PersentInput extends React.ComponentProps<'input'> {
  register?: UseFormRegisterReturn;
}

export default function PersentInput(props: PersentInput) {
  return (
    <div
      className={cls(
        'flex items-end',
        'overflow-hidden rounded-md p-1 shadow-sm',
        'border border-gray-300 placeholder-gray-400 focus-within:border-purple-500 focus:ring-purple-500',
      )}
    >
      <input
        {...props}
        className={cls(
          'w-min appearance-none border-0 p-0 text-right focus:outline-none',
        )}
      />
      <span className="ml-0.5">%</span>
    </div>
  );
}
