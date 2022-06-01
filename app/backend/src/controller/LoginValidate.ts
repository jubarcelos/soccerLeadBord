import { StatusCodes } from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';
import Jwt from '../helper/Jwt';
import RequestError from '../helper/RequestError';

interface ILoginValidateController {
  execute: controller
}

type controller = (req: Request, res: Response, next: NextFunction) =>
Promise<Response<unknown, Record<string, unknown>> | undefined>;

class LoginValidateController implements ILoginValidateController {
  private _jwt;

  constructor() {
    this._jwt = new Jwt();
  }

  public execute = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { authorization } = req.headers;
      if (!authorization) throw new RequestError(StatusCodes.UNAUTHORIZED, 'Incorrect token');
      const checkToken = this._jwt.verify(authorization);
      return res.status(StatusCodes.OK).json(checkToken.role);
    } catch (error) {
      next(error);
    }
  };
}

export default LoginValidateController;
