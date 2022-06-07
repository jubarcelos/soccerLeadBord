import { StatusCodes } from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';
import Leaderboard from '../services/Leaderboard';

interface ITeamController {
  get: controller
}

type controller = (req: Request, res: Response, next: NextFunction) =>
Promise<Response<unknown, Record<string, unknown>> | undefined>;

class LeaderboardController implements ITeamController {
  private _service;

  constructor() {
    this._service = new Leaderboard();
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

export default LeaderboardController;
