import Leaderboard from './Leaderboard';
import MatchModel from '../database/models/Match';
import TeamModel from '../database/models/Team';
import ITeam from '../interfaces/ITeam';

class HomeBoard extends Leaderboard {
  public getAll = async () => {
    const matches = await MatchModel.findAll({ where: { inProgress: false }, raw: true });
    const teams = await TeamModel.findAll() as ITeam[];
    const allTeamsMatches = teams.map((team) => {
      const teamData = matches.filter((match) => (
        team.id === match.homeTeam
      ));
      const teamsMatches = [team.teamName, teamData];
      return teamsMatches;
    });
    return allTeamsMatches;
  };
}

export default HomeBoard;
