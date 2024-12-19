import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      payload?: {
        user?: User;
        // userName: string;
        // id: string | undefined;
      };
    }
  }
}

