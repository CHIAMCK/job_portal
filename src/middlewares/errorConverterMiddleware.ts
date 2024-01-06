const httpStatus = require('http-status');

import { Request, Response, NextFunction } from 'express';

function errorConverterMiddleware(err: any, req: Request, res: Response, next: NextFunction) {
    if (!(err instanceof Error)) {
      // If the error is not an instance of Error, create a new Error object
      err = new Error(String(err));
    }

    // Send a formatted error response to the client
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: err.message });
  }

  export { errorConverterMiddleware };
