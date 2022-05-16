import { _prisma } from '@libs/server';
import { SERVER_MESSAGE } from '@libs/server/constants';
import { withHandler, withSession } from '@middlewares';

export default withHandler({
  public: {
    POST: withSession(async (req, res) => {
      const { publishKey, password } = req.body;

      const findedUser = await _prisma.user.findUnique({
        where: { publishKey },
      });

      if (!findedUser) {
        return res.status(400).json({ message: SERVER_MESSAGE.LOGIN_ID_ERROR });
      }

      if (findedUser && findedUser.password !== password) {
        return res.status(400).json({ message: SERVER_MESSAGE.LOGIN_PW_ERROR });
      }

      req.session.user = findedUser;
      await req.session.save();

      res.json({ user: findedUser });
    }),
  },
});
