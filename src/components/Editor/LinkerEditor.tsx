import Input from '@components/Input';
import PersentInput from '@components/PersentInput';
import { Linker } from '@prisma/client';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

interface LinkerEditorProps {
  linker: Linker;
  setLinker: (linker: Linker) => void;
  deleteLinker: () => void;
}

const controlPos = (x: number) => Math.min(Math.max(+x, 0), 100);

export default function LinkerEditor({
  linker,
  setLinker,
  deleteLinker,
}: LinkerEditorProps) {
  const { register, setValue, watch } = useForm<Linker>({ defaultValues: linker });
  const watchLinker = watch();

  useEffect(() => {
    const { startX, startY, endX, endY, linkURL } = watchLinker;

    console.log('try');

    if (linker.startX !== startX) {
      setValue('startX', controlPos(startX));
    } else if (linker.startY !== startY) {
      setValue('startY', controlPos(startY));
    } else if (linker.endX !== endX) {
      setValue('endX', controlPos(endX));
    } else if (linker.endY !== endY) {
      setValue('endY', controlPos(endY));
    } else if (linker.linkURL === linkURL) {
      // 변경되지 않음.
      return;
    }

    setLinker(watchLinker);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchLinker]);

  return (
    <div className="relative space-y-2 rounded-xl p-6 ring-1 ring-purple-300">
      <div className="flex space-x-4">
        <PersentInput register={register('startX')} />
        <PersentInput register={register('endX')} />
      </div>
      <div className="flex space-x-4">
        <PersentInput register={register('startY')} />
        <PersentInput register={register('endY')} />
      </div>

      <Input register={register('linkURL')} className="w-full flex-1" />

      <div
        onClick={deleteLinker}
        className="absolute -right-2 -top-4 h-8 w-8 cursor-pointer rounded-md bg-purple-300"
      />
    </div>
  );
}
