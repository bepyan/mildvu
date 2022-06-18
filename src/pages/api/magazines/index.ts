import _prisma from '_prisma';
import { withHandler } from '@middlewares';

export default withHandler({
  public: {
    GET: async (req, res) => {
      const magazines = await _prisma.magazine.findMany({
        include: { contents: true, user: true },
        orderBy: [{ createdAt: 'desc' }],
      });

      res.status(200).json({ magazines });
    },
  },
});
