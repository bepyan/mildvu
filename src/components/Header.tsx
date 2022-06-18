import { DotsHorizontalIcon } from '@heroicons/react/solid';
import { useLogout, useUser } from '@hooks';
import { cls } from '@libs/client';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Button from './Button';

interface HeaderProps {
  className?: string;
}

export default function Header({ className }: HeaderProps) {
  const { user, isLoading } = useUser();
  const logout = useLogout();
  const router = useRouter();

  const navToHome = () => router.push('/');
  const navToLogin = () => router.push('/login');

  return (
    <div className={cls('flex items-end py-4', className)}>
      <div className="cursor-pointer" onClick={navToHome}>
        <h5 className="text-4xl font-bold text-purple-500">Mildvu</h5>
      </div>

      <div className="ml-4 flex items-end">
        {isLoading ? (
          <></>
        ) : !user ? (
          <></>
        ) : (
          <>
            <Link href="/me">내 매거진</Link>
          </>
        )}
      </div>

      <div className="ml-auto flex items-end">
        {isLoading ? (
          <span className="text-purple-500">
            <DotsHorizontalIcon fontSize={18} />
          </span>
        ) : !user ? (
          <Button kind="outline" size="normal" onClick={navToLogin}>
            로그인 / 회원가입
          </Button>
        ) : (
          <Button kind="outline" size="normal" {...logout}>
            로그아웃
          </Button>
        )}
      </div>
    </div>
  );
}
