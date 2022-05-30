import { cls } from '@libs/client';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

interface FileForm {
  image?: FileList;
}

interface FileInputProps {
  className?: string;
  setPreview: (preview: string) => void;
}

export default function FileInput({ className, setPreview }: FileInputProps) {
  const { register, resetField, watch } = useForm<FileForm>();
  const image = watch('image');

  useEffect(() => {
    if (image && image.length > 0) {
      const file = image[0];
      setPreview(URL.createObjectURL(file));
      resetField('image');
    }
  }, [image, resetField, setPreview]);

  return (
    <label
      htmlFor="picture"
      className={cls(
        'block py-3 px-4',
        'cursor-pointer rounded-md border border-gray-300 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50',
        className,
      )}
    >
      이미지 옵로드
      <input
        {...register('image')}
        id="picture"
        type="file"
        className="hidden"
        accept="image/*"
      />
    </label>
  );
}
