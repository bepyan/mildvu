import {
  checkUndefinedRequest,
  SERVER_MESSAGE,
  withHandler,
  withSession,
  _prisma,
} from '@libs/server';

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
