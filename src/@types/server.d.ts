import { NextApiRequest, NextApiResponse } from 'next';

declare module '@types' {
  type MethodType = 'GET' | 'POST' | 'UPDATE' | 'PUT' | 'DELETE';

  interface ErrorResponseType {
    message: string;
  }
}
