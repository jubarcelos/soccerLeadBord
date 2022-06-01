import { StatusCodes } from 'http-status-codes';
import ITeam from '../interfaces/ITeam';
import TeamModel from '../database/models/Team';
import RequestError from '../helper/RequestError';

class MatchesService {
  public get = async () => {
    const matchList = await TeamModel.findAll() as ITeam[];
    if (!matchList) throw new RequestError(StatusCodes.UNAUTHORIZED, 'Does not have exist teams');
    return matchList;
  };
}

export default MatchesService;
