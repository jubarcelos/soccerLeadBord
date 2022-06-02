import { StatusCodes } from 'http-status-codes';
import MatchModel from '../database/models/Match';
import RequestError from '../helper/RequestError';

class LoginService {
  public create = async ({
    homeTeam,
    awayTeam,
    homeTeamGoals,
    awayTeamGoals,
    inProgress,
  }) => {
    const matchListed = await MatchModel.findOne({ where: { homeTeam, awayTeam, inProgress } });
    const newMatch = await MatchModel.create({
      homeTeam,
      awayTeam,
      homeTeamGoals,
      awayTeamGoals,
      inProgress,
    });

    if (matchListed) throw new RequestError(StatusCodes.UNAUTHORIZED, 'Team already exists');
    return newMatch;
  };
}

export default LoginService;
