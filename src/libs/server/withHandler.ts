import { MethodType } from '@types';
import { NextApiHandler } from 'next';

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
   * public에 이미 선언했다면 실행이 안됩니다.
   */
  private: privateHandlers = {},
}: HandlerConfig): NextApiHandler => {
  return async (req, res) => {
    const publicHandler = publicHandlers[req.method as MethodType];
    const privateHandler = privateHandlers[req.method as MethodType];

    try {
      if (publicHandler) {
        return await publicHandler(req, res);
      }

      if (privateHandler) {
        if (!req.session.user) {
          return res.status(401).json({ ok: false, error: '인증이 필요합니다.' });
        }

        return await privateHandler(req, res);
      }

      res.status(405).end();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error });
    }
  };
};
