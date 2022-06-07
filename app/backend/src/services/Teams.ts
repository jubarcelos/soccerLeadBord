import { StatusCodes } from 'http-status-codes';
import ITeam from '../interfaces/ITeam';
import TeamModel from '../database/models/Team';
import RequestError from '../helper/RequestError';

class TeamsService {
  public get = async () => {
    const teamList = await TeamModel.findAll() as ITeam[];
    if (!teamList) throw new RequestError(StatusCodes.UNAUTHORIZED, 'Does not have exist teams');
    return teamList;
  };
}

export default TeamsService;
