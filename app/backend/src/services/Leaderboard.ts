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
      const teamsMatches = [team, teamData];
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

  public generateLeaderboard = ([team, matches]: (ITeam | IMatch[])[]) => {
    const { id, teamName } = team as ITeam;
    const leaderboard = {
      efficiency: this.efficiencyPercentage(id, matches as IMatch[]),
      goalsBalance: this.goalsBalance(id, matches as IMatch[]),
      goalsFavor: this.goals(id, matches as IMatch[]).goalsFavor,
      goalsOwn: this.goals(id, matches as IMatch[]).goalsOwn,
      name: teamName,
      totalDraws: this.winnerTeam(id, matches as IMatch[]).draws,
      totalGames: (matches as IMatch[]).length,
      totalLosses: this.winnerTeam(id, matches as IMatch[]).losses,
      totalPoints: this.totalPoints(id, matches as IMatch[]),
      totalVictories: this.winnerTeam(id, matches as IMatch[]).wins,
    };
    return leaderboard;
  };

  public winnerTeam = (teamId:number | undefined, matches: IMatch[]) => {
    const result = { wins: 0, losses: 0, draws: 0 };
    let playersOne = 0;
    let playersTwo = 0;

    matches.forEach((match) => {
      if (teamId === match.homeTeam) {
        playersOne = match.homeTeamGoals;
        playersTwo = match.awayTeamGoals;
      } else {
        playersOne = match.awayTeamGoals;
        playersTwo = match.homeTeamGoals;
      }
      if (playersOne > playersTwo) result.wins += 1;
      if (playersOne < playersTwo) result.losses += 1;
      if (playersOne === playersTwo) result.draws += 1;
    });
    return result;
  };

  public goals = (teamId:number | undefined, matches: IMatch[]) => {
    const goals = {
      goalsFavor: 0,
      goalsOwn: 0,
    };

    matches.forEach((match) => {
      if (teamId === match.homeTeam) {
        goals.goalsFavor += match.homeTeamGoals;
        goals.goalsOwn += match.awayTeamGoals;
      } else {
        goals.goalsFavor += match.awayTeamGoals;
        goals.goalsOwn += match.homeTeamGoals;
      }
    });
    return goals;
  };

  public goalsBalance = (teamId:number | undefined, matches: IMatch[]) => {
    const goals = this.goals(teamId, matches as IMatch[]);
    const result = goals.goalsFavor - goals.goalsOwn;
    return result;
  };

  public totalPoints = (teamId:number | undefined, matches: IMatch[]) => {
    const result = this.winnerTeam(teamId, matches);
    const points = Number(result.wins) * 3 + Number(result.draws);
    return Number(points.toFixed(2)) as number;
  };

  public efficiencyPercentage = (teamId:number | undefined, matches: IMatch[]) => {
    const playRelation = (matches.length) * 3;
    const efficiency = Number(this.totalPoints(teamId, matches)) / playRelation;
    const percentage = (efficiency * 100).toFixed(2);
    return +percentage as number;
  };
}

export default Leaderboard;
