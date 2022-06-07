import { StatusCodes } from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';
import HomeBoard from '../services/HomeBoard';

interface ITeamController {
  get: controller
}

type controller = (req: Request, res: Response, next: NextFunction) =>
Promise<Response<unknown, Record<string, unknown>> | undefined>;

class HomeBoardController implements ITeamController {
  private _service;

  constructor() {
    this._service = new HomeBoard();
  }

  public get = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const matchesList = await this._service.createBoard();
      return res.status(StatusCodes.OK).json(matchesList);
    } catch (error) {
      next(error);
    }
  };
}

export default HomeBoardController;
