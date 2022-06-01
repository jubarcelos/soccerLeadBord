import { StatusCodes } from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';
import TeamService from '../services/GetTeamById';

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
      const { id } = req.params;
      const team = await this._service.get(parseInt(id, 10));
      return res.status(StatusCodes.OK).json(team);
    } catch (error) {
      next(error);
    }
  };
}

export default TeamController;
