import { NextFunction, Request, Response } from 'express';
import * as Joi from 'joi';

const validInputs = (schema: Joi.Schema) => (req:Request, res:Response, next:NextFunction) => {
  const { error } = schema.validate(req.body);
  if (error) throw error;
  next();
};

export default validInputs;
