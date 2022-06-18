import _prisma from '_prisma';
import { withHandler } from '@middlewares';

export default withHandler({
  private: {
    GET: async (req, res) => {
      const user = req.session.user!;

      const magazines = await _prisma.magazine.findMany({
        where: { userId: user.id },
        include: { contents: true },
        orderBy: [{ createdAt: 'desc' }],
      });

      res.status(200).json({ magazines });
    },
  },
});
