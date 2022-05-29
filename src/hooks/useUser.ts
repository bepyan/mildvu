import { User } from '@prisma/client';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useSWR from 'swr';

interface ProfileResponse {
  user: User;
}

export const useUser = ({ redirect = false } = {}) => {
  const router = useRouter();
  const { data, error } = useSWR<ProfileResponse>('/api/users/me');

  useEffect(() => {
    if (!data && error && redirect) {
      router.replace('/login');
    }
  }, [data, error, redirect, router]);

  return { user: data?.user, isLoading: !data && !error };
};
