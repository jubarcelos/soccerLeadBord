import { Model, DataTypes } from 'sequelize';
import db from '.';

class Team extends Model {
  public id!: number;
  public teamName!: string;
}

Team.init({
  id: { type: DataTypes.NUMBER,
    primaryKey: true,
  },
  teamName: DataTypes.STRING,
}, {
  sequelize: db,
  underscored: true,
  modelName: 'Team',
  timestamps: false,
  tableName: 'teams',
});
export default Team;
