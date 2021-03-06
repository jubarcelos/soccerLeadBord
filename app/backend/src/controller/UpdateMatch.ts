import { StatusCodes } from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';
import UpdateMatchService from '../services/UpdateMatch';
import RequestError from '../helper/RequestError';

interface IMatchController {
  update: controller
}

type controller = (req: Request, res: Response, next: NextFunction) =>
Promise<Response<unknown, Record<string, unknown>> | undefined>;

class UpdateMatchController implements IMatchController {
  private _service;

  constructor() {
    this._service = new UpdateMatchService();
  }

  public update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { authorization } = req.headers;
      if (!authorization) throw new RequestError(StatusCodes.UNAUTHORIZED, 'Token is not validate');
      const { id } = req.params;
      await this._service
        .update(req.body, Number(id), authorization as string);
      return res.status(StatusCodes.OK).json({ message: 'Updated' });
    } catch (error) {
      next(error);
    }
  };
}

export default UpdateMatchController;
