import ITeam from '../interfaces/ITeam';
import TeamModel from '../database/models/Team';

class TeamsService {
  public get = async () => {
    const teamList = await TeamModel.findAll() as ITeam[];
    return teamList;
  };
}

export default TeamsService;
