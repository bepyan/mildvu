import { User } from '@prisma/client';
import { SSRPropsResult } from '@types';
import { withIronSessionApiRoute, withIronSessionSsr } from 'iron-session/next';
import { GetServerSidePropsContext, NextApiHandler } from 'next';

declare module 'iron-session' {
  interface IronSessionData {
    user?: User;
  }
}

const cookieOptions = {
  cookieName: 'mildvu_session',
  password: process.env.COOKIE_PASSWORD!,
};

/**
 * API를 위한 미들웨어 입니다.
 *
 * req.session.user에 유저 데이터가 있습니다.
 *
 * ```ts
 * withSession(async (req, res) => {
 *   // 로그인
 *   req.session.user = createdUser;
 *   await req.session.save();
 *
 *   // 로그아웃
 *   req.session.destroy();
 * })
 * ```
 */
export const withSession = (fn: NextApiHandler) => {
  return withIronSessionApiRoute(fn, cookieOptions);
};

/**
 * getServerSideProps(SSR)과 함께 사용합니다.
 *
 * ```ts
 * export const getServerSideProps = withSessionSSR(({ req }) => {
 *  const user = req.sesstion.user;
 *  return {
 *    props: { user }
 *  }
 * });
 * ```
 */
export const withSessionSSR = <
  P extends { [key: string]: unknown } = { [key: string]: unknown },
>(
  fn: (context: GetServerSidePropsContext) => SSRPropsResult<P>,
) => {
  return withIronSessionSsr(fn, cookieOptions);
};

/**
 * getServerSideProps(SSR)과 함께 사용합니다.
 *
 * 로그인 되지 않으면 로그인 페이지로 이동하게 됩니다.
 *
 * ```ts
 * export const getServerSideProps = withUserSesstionSSR(({ user }) => {
 *  return {
 *    props: { user }
 *  }
 * });
 * ```
 */
export const withUserSesstionSSR = <
  P extends { [key: string]: unknown } = { [key: string]: unknown },
>(
  fn: (context: { user: User } & GetServerSidePropsContext) => SSRPropsResult<P>,
) => {
  return withSessionSSR((context) => {
    const user = context.req.session.user;
    if (!user) {
      return {
        redirect: {
          destination: '/login',
          permanent: true,
        },
      };
    }

    return fn({ ...context, user });
  });
};

export const withRestrictSesstionSSR = (
  fn: (
    context: GetServerSidePropsContext,
  ) => SSRPropsResult<{ [key: string]: unknown }> = () => ({
    props: {},
  }),
) => {
  return withSessionSSR((context) => {
    const user = context.req.session.user;
    if (user) {
      return {
        redirect: {
          destination: '/',
          permanent: true,
        },
      };
    }

    return fn({ ...context });
  });
};
