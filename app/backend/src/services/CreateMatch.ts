import { StatusCodes } from 'http-status-codes';
import { IMatch } from '../interfaces/IMatch';
import MatchModel from '../database/models/Match';
import RequestError from '../helper/RequestError';
import TeamModel from '../database/models/Team';
import ITeam from '../interfaces/ITeam';

class CreateMatchService {
  public create = async (body: IMatch, token: string) => {
    if (!token) throw new RequestError(StatusCodes.UNAUTHORIZED, 'Token is not validate');
    const { homeTeam, awayTeam } = body;

    const teamList = await TeamModel.findAll() as ITeam[];
    const existsHomeTeam = teamList.find((team) => Number(team.id) === Number(homeTeam));
    const existsAwayTeam = teamList.find((team) => Number(team.id) === Number(awayTeam));
    if (!existsHomeTeam || !existsAwayTeam) {
      throw new RequestError(StatusCodes.UNAUTHORIZED, 'There is no team with such id!');
    }
    if (homeTeam === awayTeam) {
      const message = 'It is not possible to create a match with two equal teams';
      throw new RequestError(StatusCodes.UNAUTHORIZED, message);
    }

    const newMatch = await MatchModel.create({ ...body, inProgress: true });

    return newMatch;
  };
}

export default CreateMatchService;
