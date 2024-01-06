const httpStatus = require('http-status');

import { Request, Response, NextFunction } from 'express';

function errorConverterMiddleware(err: any, req: Request, res: Response, next: NextFunction) {
    if (!(err instanceof Error)) {
      err = new Error(String(err));
    }

    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: err.message });
  }

  export { errorConverterMiddleware };
