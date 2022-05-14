import type { UseFormRegisterReturn } from 'react-hook-form';

interface InputProps {
  label?: string;
  kind?: 'text' | 'phone' | 'price';
  type?: string;
  register: UseFormRegisterReturn;
  required?: boolean;
  className?: string;
}

export const Input = ({
  label,
  kind = 'text',
  type,
  required,
  register,
  className,
}: InputProps) => {
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
      {kind === 'text' ? (
        <div className="relative flex items-center rounded-md shadow-sm">
          <input
            id={register.name}
            required={required}
            type={type}
            className="w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-purple-500"
            autoComplete="on"
            {...register}
          />
        </div>
      ) : null}
    </div>
  );
};
