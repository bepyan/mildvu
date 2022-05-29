import { cls } from '@libs/client';
import type { UseFormRegisterReturn } from 'react-hook-form';

interface InputProps extends React.ComponentProps<'input'> {
  label?: string;
  kind?: 'text' | 'phone' | 'price';
  register: UseFormRegisterReturn;
}

export default function Input({
  className,
  label,
  kind = 'text',
  register,
  ...props
}: InputProps) {
  return (
    <div className={className}>
      {label && (
        <label
          className="mb-1 block text-sm font-medium text-gray-700"
          htmlFor={register.name}
        >
          {label}
        </label>
      )}
      <div className="relative flex items-center rounded-md shadow-sm">
        <input
          id={register.name}
          className={cls(
            'w-full appearance-none rounded-md border px-3 py-2 shadow-sm focus:outline-none ',
            'border-gray-300 placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500',
          )}
          autoComplete="on"
          {...props}
          {...register}
        />
      </div>
    </div>
  );
}
