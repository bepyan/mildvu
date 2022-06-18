import _prisma from '_prisma';
import { withHandler } from '@middlewares';
import { SERVER_MESSAGE } from '@libs/server/constants';

export default withHandler({
  public: {
    GET: async (req, res) => {
      const { id } = req.query;

      const magazine = await _prisma.magazine.findUnique({
        where: {
          id: +id,
        },
        include: {
          contents: {
            include: {
              linkers: true,
            },
          },
        },
      });
      if (!magazine) return res.status(404).json({ message: SERVER_MESSAGE.NOT_FOUND });

      res.status(200).json({ magazine });
    },
  },
  private: {
    DELETE: async (req, res) => {
      const { id } = req.query;

      await _prisma.magazine.delete({
        where: { id: +id },
      });

      res.status(200).json({});
    },
  },
});
