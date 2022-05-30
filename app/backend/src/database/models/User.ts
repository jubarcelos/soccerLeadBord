import { Model, DataTypes } from 'sequelize';
import db from '.';

class User extends Model {
  public id!: number;
  public username!: string;
  public rule: string;
  public email!: string;
  public password!: string;
}

User.init({
  username: DataTypes.STRING,
  role: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
}, {
  sequelize: db,
  underscored: true,
  modelName: 'User',
  timestamps: false,
  tableName: 'users',
});
export default User;
