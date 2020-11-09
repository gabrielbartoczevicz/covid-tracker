import { Request, Response, NextFunction } from 'express';

import AppError from '@shared/errors/AppError';
import { error } from '@shared/logger';

const errorsMiddleware = async (
  err: Error, req: Request, res: Response, _: NextFunction,
): Promise<Response> => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  error(err);

  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
};

export default errorsMiddleware;
