import { ErrorResponseType } from '@types';
import { useState } from 'react';
import { _axios } from '../libs/client/_axios';

type MutationMethod = 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export interface MutationConfig<T> {
  url: string;
  method?: MutationMethod;
  onSuccess?: (data: T) => void;
  onError?: (error: unknown) => void;
}

interface UseMutationState<T> {
  loading: boolean;
  data?: T;
  error?: ErrorResponseType;
}

const INIT_STATE: UseMutationState<any> = {
  loading: false,
  data: undefined,
  error: undefined,
};

export const useMutation = <T = any>({
  url,
  method = 'POST',
  onSuccess,
  onError,
}: MutationConfig<T>) => {
  const [state, setState] = useState<UseMutationState<T>>(INIT_STATE);

  const reset = () => setState(INIT_STATE);

  const mutate = async <TBody = any>(body?: TBody) => {
    setState((prev) => ({ ...prev, loading: true }));

    try {
      const { data } = await _axios({
        url,
        method,
        data: body,
      });
      setState((prev) => ({ ...prev, data }));
      onSuccess?.(data);
    } catch (error: any) {
      const message = error.message;

      setState((prev) => ({ ...prev, error: { message } }));
      onError?.(error);
    } finally {
      setState((prev) => ({ ...prev, loading: false }));
    }
  };

  return { ...state, reset, mutate };
};
