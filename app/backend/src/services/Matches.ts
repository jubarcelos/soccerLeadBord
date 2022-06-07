import { StatusCodes } from 'http-status-codes';
import MatchModel from '../database/models/Match';
import TeamModel from '../database/models/Team';
import RequestError from '../helper/RequestError';

class MatchesService {
  public get = async (inProgress: string) => {
    const matchList = await MatchModel.findAll({
      include: [{ model: TeamModel, as: 'teamHome', attributes: ['teamName'] },
        { model: TeamModel, as: 'teamAway', attributes: ['teamName'] }],
    });

    if (!matchList) throw new RequestError(StatusCodes.UNAUTHORIZED, 'Not have matches registered');
    const matchesInProgress = matchList.filter((match) => match.inProgress === true);
    const matchesEnded = matchList.filter((match) => match.inProgress === false);

    if (inProgress && inProgress === 'true') {
      return matchesInProgress;
    }
    if (inProgress && inProgress === 'false') {
      return matchesEnded;
    }

    return matchList;
  };
}

export default MatchesService;
