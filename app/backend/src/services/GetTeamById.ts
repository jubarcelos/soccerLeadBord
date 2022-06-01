import { StatusCodes } from 'http-status-codes';
import ITeam from '../interfaces/ITeam';
import TeamModel from '../database/models/Team';
import RequestError from '../helper/RequestError';

class LoginService {
  public get = async (id: number) => {
    const team = await TeamModel.findOne({ where: { id } }) as ITeam;
    if (!team) throw new RequestError(StatusCodes.UNAUTHORIZED, 'Team not registered');
    return team;
  };
}

export default LoginService;
