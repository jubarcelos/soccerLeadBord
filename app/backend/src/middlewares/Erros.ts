import * as Joi from 'joi';
import { NextFunction, Response, Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import RequestError from '../helper/RequestError';

const handlerError = (err:Error, req:Request, res:Response, _next:NextFunction) => {
  if (Joi.isError(err)) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: 'All fields must be filled' });
  }
  if (err instanceof RequestError) {
    return res.status(err.status).json({ message: err.message });
  }
  console.log(err);
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'server error' });
};

export default handlerError;
