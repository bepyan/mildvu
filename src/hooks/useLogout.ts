import { useRouter } from 'next/router';

import { useMutation } from './useMutation';

export const useLogout = () => {
  const router = useRouter();

  const logoutMutation = useMutation({
    url: '/api/users/logout',
    onSuccess: () => router.push('/login'),
  });

  return { loading: logoutMutation.loading, onClick: logoutMutation.mutate };
};
