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
      const { inProgress } = req.query;

      const matchesInProgress = matchesList.filter((match) => match.inProgress === true);
      const matchesEnded = matchesList.filter((match) => match.inProgress === false);

      if (inProgress && inProgress === 'true') {
        return res.status(StatusCodes.OK).json(matchesInProgress);
      }
      if (inProgress && inProgress === 'false') {
        return res.status(StatusCodes.OK).json(matchesEnded);
      }
      return res.status(StatusCodes.OK).json(matchesList);
    } catch (error) {
      next(error);
    }
  };
}

export default MatchesController;
