import { Model, DataTypes } from 'sequelize';
import db from '.';

class Match extends Model {
  public id: number;
  public homeTeam: number;
  public awayTeam: number;
  public homeTeamGoals: number;
  public awayTeamGoals: number;
  public inProgress: boolean;
}

Match.init({
  teamName: DataTypes.STRING,
  id: DataTypes.NUMBER,
  homeTeam: DataTypes.NUMBER,
  awayTeam: DataTypes.NUMBER,
  homeTeamGoals: DataTypes.NUMBER,
  awayTeamGoals: DataTypes.NUMBER,
  inProgress: DataTypes.BOOLEAN,
}, {
  sequelize: db,
  underscored: true,
  modelName: 'Match',
  timestamps: false,
  tableName: 'matches',
});
export default Match;
