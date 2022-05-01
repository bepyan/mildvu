import { NextApiRequest, NextApiResponse } from 'next';

declare module '@types' {
  type MethodType = 'GET' | 'POST' | 'UPDATE' | 'PUT' | 'DELETE';

  interface ResponseType {
    ok: boolean;
    [key: string]: any;
  }
}
