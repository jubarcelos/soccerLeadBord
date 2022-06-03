import { StatusCodes } from 'http-status-codes';
import { IMatch } from '../interfaces/IMatch';
import MatchModel from '../database/models/Match';
import RequestError from '../helper/RequestError';

class CreateMatchService {
  public create = async (body: IMatch, token: string) => {
    const {
      homeTeam,
      awayTeam,
      homeTeamGoals,
      awayTeamGoals,
    } = body;

    if (!token) throw new RequestError(StatusCodes.UNAUTHORIZED, 'Token is not validate');
    // const matchListed = await MatchModel.findOne({ where: { homeTeam, awayTeam, inProgress } });

    // if (matchListed) throw new RequestError(StatusCodes.UNAUTHORIZED, 'Match already exists');

    const newMatch = await MatchModel.create({
      homeTeam,
      awayTeam,
      homeTeamGoals,
      awayTeamGoals,
      inProgress: true,
    });

    return newMatch;
  };
}

export default CreateMatchService;
