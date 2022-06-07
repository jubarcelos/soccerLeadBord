import { StatusCodes } from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';
import AwayBoard from '../services/AwayBoard';

interface ITeamController {
  get: controller
}

type controller = (req: Request, res: Response, next: NextFunction) =>
Promise<Response<unknown, Record<string, unknown>> | undefined>;

class AwayBoardController implements ITeamController {
  private _service;

  constructor() {
    this._service = new AwayBoard();
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

export default AwayBoardController;
