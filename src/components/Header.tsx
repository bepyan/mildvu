import { useLogout, useUser } from '@hooks';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Button from './Button';

export default function Header() {
  const { user, isLoading } = useUser();
  const logout = useLogout();
  const router = useRouter();

  const navToHome = () => router.push('/');
  const navToLogin = () => router.push('/login');

  return (
    <div className="flex items-end py-4">
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
          <></>
        ) : !user ? (
          <Button kind="secondary" size="normal" onClick={navToLogin}>
            로그인 / 회원가입
          </Button>
        ) : (
          <Button kind="secondary" size="normal" {...logout}>
            로그아웃
          </Button>
        )}
      </div>
    </div>
  );
}
