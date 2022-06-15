import { StatusCodes } from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';
import FinishedMatchService from '../services/FinishedMatch';
import RequestError from '../helper/RequestError';

interface IFinishedMatchController {
  update: controller
}

type controller = (req: Request, res: Response, next: NextFunction) =>
Promise<Response<unknown, Record<string, unknown>> | undefined>;

class FinishedMatchController implements IFinishedMatchController {
  private _service;

  constructor() {
    this._service = new FinishedMatchService();
  }

  public update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { authorization } = req.headers;
      if (!authorization) throw new RequestError(StatusCodes.UNAUTHORIZED, 'Token is not validate');
      const { id } = req.params;
      await this._service.update(Number(id), authorization as string);
      return res.status(StatusCodes.OK).json({ message: 'Finished' });
    } catch (error) {
      next(error);
    }
  };
}

export default FinishedMatchController;
