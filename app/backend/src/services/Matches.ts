import { StatusCodes } from 'http-status-codes';
import MatchModel from '../database/models/Match';
import TeamModel from '../database/models/Team';
import RequestError from '../helper/RequestError';

class MatchesService {
  public get = async () => {
    const matchList = await MatchModel.findAll({
      include: [{ model: TeamModel, as: 'teamHome', attributes: ['teamName'] },
        { model: TeamModel, as: 'teamAway', attributes: ['teamName'] }],
    });

    if (!matchList) throw new RequestError(StatusCodes.UNAUTHORIZED, 'Not have matches registered');
    return matchList;
  };
}

export default MatchesService;
