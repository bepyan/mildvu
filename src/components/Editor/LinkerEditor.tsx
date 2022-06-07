import PersentInput from '@components/PersentInput';
import { cls } from '@libs/client';
import { Linker } from '@prisma/client';
import React, { useEffect, useState } from 'react';

interface LinkerEditorProps {
  linker: Linker;
  setLinker: (linker: Linker) => void;
  deleteLinker: () => void;
}

const controlPos = (x: number | string) => Math.min(Math.max(+x || 0, 0), 100);

export const LinkerEditor = ({ linker, setLinker, deleteLinker }: LinkerEditorProps) => {
  const [state, setState] = useState(linker);

  const register = (key: keyof Linker) => ({
    value: state[key],
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      setState({
        ...state,
        [key]: controlPos(e.target.value),
      });
    },
  });

  useEffect(() => setLinker(state), [state]);
  useEffect(() => setState(linker), [linker]);

  return (
    <div className="relative space-y-2 rounded-xl p-6 ring-1 ring-purple-300">
      <div className="flex space-x-4">
        <PersentInput {...register('startX')} />
        <PersentInput {...register('endX')} />
      </div>
      <div className="flex space-x-4">
        <PersentInput {...register('startY')} />
        <PersentInput {...register('endY')} />
      </div>

      <div
        className={cls(
          'overflow-hidden rounded-md p-1 shadow-sm',
          'border border-gray-300 placeholder-gray-400 focus-within:border-purple-500 focus:ring-purple-500',
        )}
      >
        <input
          value={state.linkURL}
          onChange={(e) => setState({ ...state, linkURL: e.target.value })}
          className="w-full appearance-none border-0 px-2 focus:outline-none"
        />
      </div>

      <div
        onClick={deleteLinker}
        className="absolute -right-2 -top-4 h-8 w-8 cursor-pointer rounded-md bg-purple-300"
      />
    </div>
  );
};
