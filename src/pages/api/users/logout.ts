import { withHandler, withSession, _prisma } from '@libs/server';

export default withHandler({
  private: {
    POST: (req, res) => {
      req.session.destroy();
      res.json({});
    },
  },
});
