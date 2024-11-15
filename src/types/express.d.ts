import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      payload?: {
        userName: string;
        id: string | undefined;
      };
    }
  }
}

