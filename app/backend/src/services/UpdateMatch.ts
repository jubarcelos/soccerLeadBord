import { StatusCodes } from 'http-status-codes';
import { IMatchUpdate } from '../interfaces/IMatch';
import MatchModel from '../database/models/Match';
import RequestError from '../helper/RequestError';

class UpdateMatchService {
  public update = async (body: IMatchUpdate, id:number, token: string): Promise< boolean> => {
    if (!token) throw new RequestError(StatusCodes.UNAUTHORIZED, 'Token is not validate');

    const match = await MatchModel.findOne({ where: { id } });
    if (match && body.homeTeamGoals >= 0 && body.awayTeamGoals >= 0) {
      await MatchModel.update(
        { homeTeamGoals: body.homeTeamGoals, awayTeamGoals: body.awayTeamGoals },
        { where: { id } },
      );
      return true;
    }
    return false;
  };
}

export default UpdateMatchService;
