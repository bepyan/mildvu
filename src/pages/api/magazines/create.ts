import _prisma from '_prisma';
import { withHandler } from '@middlewares';
import { ContentWithLinker } from '@types';

export default withHandler({
  private: {
    POST: async (req, res) => {
      const contentList = req.body.contentList as ContentWithLinker[];
      const user = req.session.user!;

      const magazine = await _prisma.magazine.create({
        data: {
          userId: user.id,
          contents: {
            create: contentList.map((content) => ({
              index: content.index,
              imageURL: content.imageURL,
              linkers: {
                create: content.linkers.map((linker) => ({
                  ...linker,
                })),
              },
            })),
          },
        },
        include: {
          contents: {
            include: {
              linkers: true,
            },
          },
        },
      });

      res.status(200).json({ magazine });
    },
  },
});
