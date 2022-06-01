import { StatusCodes } from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';
import MatchesService from '../services/Matches';

interface IMatchesController {
  get: controller
}

type controller = (req: Request, res: Response, next: NextFunction) =>
Promise<Response<unknown, Record<string, unknown>> | undefined>;

class MatchesController implements IMatchesController {
  private _service;

  constructor() {
    this._service = new MatchesService();
  }

  public get = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const matchesList = await this._service.get();
      return res.status(StatusCodes.OK).json(matchesList);
    } catch (error) {
      next(error);
    }
  };
}

export default MatchesController;
