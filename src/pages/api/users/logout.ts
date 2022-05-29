import _prisma from '_prisma';
import { withHandler } from '@middlewares';

export default withHandler({
  private: {
    POST: (req, res) => {
      req.session.destroy();
      res.json({});
    },
  },
});
