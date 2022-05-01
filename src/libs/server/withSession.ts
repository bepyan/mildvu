import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiHandler } from 'next';

declare module 'iron-session' {
  interface IronSessionData {
    user?: {
      id: number;
    };
  }
}

const cookieOptions = {
  cookieName: 'carrotsession',
  password: process.env.COOKIE_PASSWORD!,
};

export const withSession = (fn: NextApiHandler) => {
  return withIronSessionApiRoute(fn, cookieOptions);
};
