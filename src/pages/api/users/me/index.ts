import _prisma from '_prisma';
import { SERVER_MESSAGE } from '@libs/server/constants';
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
  private: {
    PUT: async (req, res) => {
      const user = req.session.user!;
      const desc = req.body.desc as string;

      const updatedUser = await _prisma.user.update({
        where: { id: user.id },
        data: { desc },
      });

      req.session.user = updatedUser;
      await req.session.save();

      res.status(200).json({ user: updatedUser });
    },
  },
});
