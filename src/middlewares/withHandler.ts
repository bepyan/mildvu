import { SERVER_MESSAGE } from '@libs/server/constants';
import { MethodType } from '@types';
import { NextApiHandler } from 'next';

import { withSession } from './withSession';

type MethodConfig = {
  [method in MethodType]: NextApiHandler;
};

interface HandlerConfig {
  public?: Partial<MethodConfig>;
  private?: Partial<MethodConfig>;
}

export const withHandler = ({
  public: publicHandlers = {},
  /**
   * 같은 method일 경우 public이 우선으로 실행됩니다.
   */
  private: privateHandlers = {},
}: HandlerConfig): NextApiHandler => {
  return (req, res) => {
    const publicHandler = publicHandlers[req.method as MethodType];
    const privateHandler = privateHandlers[req.method as MethodType];

    try {
      if (publicHandler) {
        return publicHandler(req, res);
      }

      if (privateHandler) {
        return withSession((req, res) => {
          if (!req.session.user) {
            res.status(401).json({ error: '인증이 필요합니다.' });
            return;
          }

          return privateHandler(req, res);
        })(req, res);
      }

      res.status(405).json({ message: SERVER_MESSAGE.INVALID_REQUEST });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: SERVER_MESSAGE.SERVER_ERROR });
    }
  };
};
