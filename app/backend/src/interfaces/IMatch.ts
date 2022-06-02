interface IMatch {
  id?:number,
  homeTeam: number,
  homeTeamGoals: number,
  awayTeam: number,
  awayTeamGoals: number,
  inProgress: boolean,
}

interface IMatchTeam {
  id?:number,
  homeTeam: number,
  homeTeamGoals: number,
  awayTeam: number,
  awayTeamGoals: number,
  inProgress: boolean,
  teamHome: object,
  teamAway: object,
}

export { IMatch, IMatchTeam };
