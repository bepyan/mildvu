import { withHandler } from '@middlewares';

export default withHandler({
  public: {
    GET: (req, res) => {
      res.json({});
    },
  },
});
