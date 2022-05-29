import { useLogout } from '@hooks';
import { User } from '@prisma/client';
import { useRouter } from 'next/router';
import Button from './Button';

export interface HeaderProps {
  user?: User;
  className?: string;
}

export default function Header({ user, className }: HeaderProps) {
  const logout = useLogout();
  const router = useRouter();

  const navToLogin = () => router.push('/login');
  const navToMe = () => router.push('/me');

  return (
    <div className="flex justify-end py-4">
      <h5 className="text-4xl font-bold text-purple-500">Mildvu</h5>
      <div className="ml-auto flex items-center space-x-4">
        {user ? (
          <>
            <a className="w-24" onClick={navToMe}>
              내 정보
            </a>
            <Button kind="secondary" size="normal" {...logout}>
              로그아웃
            </Button>
          </>
        ) : (
          <Button kind="secondary" size="normal" onClick={navToLogin}>
            로그인 / 회원가입
          </Button>
        )}
      </div>
    </div>
  );
}
