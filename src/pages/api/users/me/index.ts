import { SERVER_MESSAGE, withHandler, withSession, _prisma } from '@libs/server';

export default withHandler({
  public: {
    GET: withSession(async (req, res) => {
      const user = await _prisma.user.findUnique({
        where: { id: req.session.user?.id },
      });

      if (!user) {
        req.session.destroy();
        res.status(401).json({ message: SERVER_MESSAGE.SESSION_ERROR });
      }

      res.json({ user });
    }),
  },
});
