import Leaderboard from './Leaderboard';
import MatchModel from '../database/models/Match';
import TeamModel from '../database/models/Team';
import ITeam from '../interfaces/ITeam';
import { IMatch } from '../interfaces/IMatch';

class AwayBoard extends Leaderboard {
  public getAll = async () => {
    const matches = await MatchModel.findAll({ where: { inProgress: false }, raw: true });
    const teams = await TeamModel.findAll() as ITeam[];
    const allTeamsMatches = teams.map((team) => {
      const teamData = matches.filter((match) => (
        team.id === match.awayTeam
      ));
      const teamsMatches = [team.teamName, teamData];
      return teamsMatches;
    });
    return allTeamsMatches;
  };

  public winnerTeam = (list: IMatch[]) => {
    const result = {
      wins: 0,
      losses: 0,
      draws: 0,
    };

    list.forEach((match) => {
      if (match.homeTeamGoals < match.awayTeamGoals) {
        result.wins += 1;
      }
      if (match.homeTeamGoals > match.awayTeamGoals) {
        result.losses += 1;
      }
      if (match.homeTeamGoals === match.awayTeamGoals) {
        result.draws += 1;
      }
    });
    return result;
  };

  public goals = (list: IMatch[]) => {
    const goals = {
      goalsFavor: 0,
      goalsOwn: 0,
    };

    list.forEach((match) => {
      goals.goalsFavor += match.awayTeamGoals;
      goals.goalsOwn += match.homeTeamGoals;
    });
    return goals;
  };
}

export default AwayBoard;
