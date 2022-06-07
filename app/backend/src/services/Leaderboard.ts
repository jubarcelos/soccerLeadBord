import { IMatch } from '../interfaces/IMatch';
import MatchModel from '../database/models/Match';
import TeamModel from '../database/models/Team';
import ITeam from '../interfaces/ITeam';

class Leaderboard {
  public getAll = async () => {
    const matches = await MatchModel.findAll({ where: { inProgress: false }, raw: true });
    const teams = await TeamModel.findAll() as ITeam[];
    const allTeamsMatches = teams.map((team) => {
      const teamData = matches.filter((match) => (
        team.id === match.homeTeam || team.id === match.awayTeam
      ));
      const teamsMatches = [team.teamName, teamData];
      return teamsMatches;
    });
    return allTeamsMatches;
  };

  public createBoard = async () => {
    const leaderBoarded = (await this.getAll()).map(this.generateLeaderboard);
    const table = leaderBoarded.sort((a, b) => (
      b.totalPoints - a.totalPoints
      || b.totalVictories - a.totalVictories
      || b.goalsBalance - a.goalsBalance
      || b.goalsFavor - a.goalsFavor
      || b.goalsOwn - a.goalsOwn
    ));
    return table;
  };

  public generateLeaderboard = ([teamName, matches]: (string | IMatch[])[]) => {
    const leaderboard = {
      efficiency: this.efficiencyPercentage(matches as IMatch[]),
      goalsBalance: this.goalsBalance(matches as IMatch[]),
      goalsFavor: this.goals(matches as IMatch[]).goalsFavor,
      goalsOwn: this.goals(matches as IMatch[]).goalsOwn,
      name: teamName,
      totalDraws: this.winnerTeam(matches as IMatch[]).draws,
      totalGames: matches.length,
      totalLosses: this.winnerTeam(matches as IMatch[]).losses,
      totalPoints: this.totalPoints(matches as IMatch[]),
      totalVictories: this.winnerTeam(matches as IMatch[]).wins,
    };
    return leaderboard;
  };

  public winnerTeam = (list: IMatch[]) => {
    const result = {
      wins: 0,
      losses: 0,
      draws: 0,
    };

    list.forEach((match) => {
      if (match.homeTeamGoals > match.awayTeamGoals) {
        result.wins += 1;
      }
      if (match.homeTeamGoals < match.awayTeamGoals) {
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
      goals.goalsFavor += match.homeTeamGoals;
      goals.goalsOwn += match.awayTeamGoals;
    });
    return goals;
  };

  public goalsBalance = (list: IMatch[]) => {
    const goals = this.goals(list);
    const result = goals.goalsFavor - goals.goalsOwn;
    return result;
  };

  public totalPoints = (list: IMatch[]) => {
    const result = this.winnerTeam(list);
    const points = Number(result.wins) * 3 + Number(result.draws);
    return Number(points.toFixed(2)) as number;
  };

  public efficiencyPercentage = (list: IMatch[]) => {
    const playRelation = (list.length) * 3;
    const efficiency = Number(this.totalPoints(list)) / playRelation;
    const percentage = (efficiency * 100).toFixed(2);
    return +percentage as number;
  };
}

export default Leaderboard;
