import { StatusCodes } from 'http-status-codes';
import MatchModel from '../database/models/Match';
import RequestError from '../helper/RequestError';

class FinishedMatchService {
  public update = async (id:number, token: string): Promise< boolean> => {
    if (!token) throw new RequestError(StatusCodes.UNAUTHORIZED, 'Token is not validate');

    const match = await MatchModel.findOne({ where: { id } });
    if (match) {
      await MatchModel.update(
        { inProgress: false },
        { where: { id } },
      );
      return true;
    }
    return false;
  };
}

export default FinishedMatchService;
