import { StatusCodes } from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';
import LoginService from '../services/Login';
import Jwt from '../helper/Jwt';

interface ILoginController {
  execute: controller
}

type controller = (req: Request, res: Response, next: NextFunction) =>
Promise<Response<unknown, Record<string, unknown>> | undefined>;

class LoginController implements ILoginController {
  private _service;
  private _jwt;

  constructor() {
    this._service = new LoginService();
    this._jwt = new Jwt();
  }

  public execute = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const user = await this._service.execute({ email, password });
      const token = this._jwt.sign(user);
      return res.status(StatusCodes.OK).json({ user, token });
    } catch (error) {
      next(error);
    }
  };
}

export default LoginController;
