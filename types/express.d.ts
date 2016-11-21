/**
 * Custom typedef for Express.
 */

import { Request, Response, NextFunction } from 'express';

declare module 'express' {
  export interface ErrorMiddleware {
    (
      err: {
        status?: number,
        message?: string,
        stack?: any,
      },
      req: Request,
      res: Response,
      next: NextFunction,
    ): void;
  }
}
