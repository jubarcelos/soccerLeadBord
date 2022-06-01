import { StatusCodes } from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';
import TeamService from '../services/Teams';

interface ITeamController {
  get: controller
}

type controller = (req: Request, res: Response, next: NextFunction) =>
Promise<Response<unknown, Record<string, unknown>> | undefined>;

class TeamController implements ITeamController {
  private _service;

  constructor() {
    this._service = new TeamService();
  }

  public get = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const teamList = await this._service.get();
      return res.status(StatusCodes.OK).json(teamList);
    } catch (error) {
      next(error);
    }
  };
}

export default TeamController;
