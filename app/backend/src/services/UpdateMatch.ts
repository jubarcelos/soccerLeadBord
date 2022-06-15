import { StatusCodes } from 'http-status-codes';
import { IMatchUpdate } from '../interfaces/IMatch';
import MatchModel from '../database/models/Match';
import RequestError from '../helper/RequestError';

class UpdateMatchService {
  public update = async (body: IMatchUpdate, id:number, token: string): Promise< boolean> => {
    if (!token) throw new RequestError(StatusCodes.UNAUTHORIZED, 'Token is not validate');
    const match = await MatchModel.findOne({ where: { id }, raw: true });
    if (!match) throw new RequestError(StatusCodes.NOT_FOUND, 'Match not found');
    if (match && body.homeTeamGoals >= 0 && body.awayTeamGoals >= 0) {
      await MatchModel.update(
        { homeTeamGoals: body.homeTeamGoals, awayTeamGoals: body.awayTeamGoals },
        { where: { id, inProgress: true } },
      );
      return true;
    }
    return false;
  };
}

export default UpdateMatchService;
