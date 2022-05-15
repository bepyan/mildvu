import { SERVER_MESSAGE, _prisma } from '@libs/server';
import { withHandler, withSession } from '@middlewares';

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
