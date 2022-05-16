import { NextApiResponse } from 'next';

import { SERVER_MESSAGE } from './constants';

export const checkUndefinedRequest = (res: NextApiResponse, req: any[]) => {
  if (req.some((v) => !v)) {
    res.status(400).json({ message: SERVER_MESSAGE.INVALID_REQUEST });
    return true;
  }
  return false;
};
