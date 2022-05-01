import { withHandler } from '@libs/server';

export default withHandler({
  public: {
    GET: (req, res) => {
      res.json({ ok: true });
    },
  },
});
