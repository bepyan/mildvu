import _prisma from '_prisma';
import { checkUndefinedRequest } from '@libs/server';
import { SERVER_MESSAGE } from '@libs/server/constants';
import { withHandler, withSession } from '@middlewares';

export default withHandler({
  public: {
    POST: withSession(async (req, res) => {
      const { name, password, publishKey } = req.body;
      if (checkUndefinedRequest(res, [name, password, publishKey])) return;

      const findedUser = await _prisma.user.findUnique({
        where: { publishKey },
      });

      if (findedUser) {
        return res.status(400).json({
          message: SERVER_MESSAGE.REGISTER_ID_DUPLICATED,
        });
      }

      const createdUser = await _prisma.user.create({
        data: {
          publishKey,
          name,
          password,
        },
      });

      req.session.user = createdUser;
      await req.session.save();

      res.json({});
    }),
  },
});
