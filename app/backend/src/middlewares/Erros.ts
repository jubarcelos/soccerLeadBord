import { isError } from 'joi';
import { NextFunction, Response, Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import { isCelebrateError } from 'celebrate';
import { JsonWebTokenError } from 'jsonwebtoken';
import RequestError from '../helper/RequestError';

const handlerError = (err:Error, req:Request, res:Response, _next:NextFunction) => {
  if (isCelebrateError(err)) {
    return res.status(StatusCodes.UNAUTHORIZED)
      .json({ message: err.details.entries().next().value[1].details[0].message });
  }
  // confiei no caminho que o Guilherme Augusto me indicou.
  if (err instanceof JsonWebTokenError) {
    return res.status(StatusCodes.UNAUTHORIZED)
      .json({ message: 'Token is invalid' });
  }
  if (isError(err)) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: 'All fields must be filled' });
  }
  if (err instanceof RequestError) {
    return res.status(err.status).json({ message: err.message });
  }
  console.log(err);
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'server error' });
};

export default handlerError;
