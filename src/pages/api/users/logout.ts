import { _prisma } from '@libs/server';
import { withHandler } from '@middlewares';

export default withHandler({
  private: {
    POST: (req, res) => {
      req.session.destroy();
      res.json({});
    },
  },
});
