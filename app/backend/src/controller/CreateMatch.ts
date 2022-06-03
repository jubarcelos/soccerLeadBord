import { StatusCodes } from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';
import MatchService from '../services/CreateMatch';
import RequestError from '../helper/RequestError';

interface IMatchController {
  create: controller
}

type controller = (req: Request, res: Response, next: NextFunction) =>
Promise<Response<unknown, Record<string, unknown>> | undefined>;

class MatchController implements IMatchController {
  private _service;

  constructor() {
    this._service = new MatchService();
  }

  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { authorization } = req.headers;
      if (!authorization) throw new RequestError(StatusCodes.UNAUTHORIZED, 'Token is not validate');
      const match = await this._service.create(req.body, authorization as string);
      return res.status(StatusCodes.CREATED).json(match);
    } catch (error) {
      next(error);
    }
  };
}

export default MatchController;
