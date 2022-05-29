import { User } from '@prisma/client';
import useSWR from 'swr';

interface ProfileResponse {
  user: User;
}

export const useUser = () => {
  const { data, error } = useSWR<ProfileResponse>('/api/users/me');

  return { user: data?.user, isLoading: !data && !error };
};
