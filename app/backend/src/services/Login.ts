import { StatusCodes } from 'http-status-codes';
import { compareSync } from 'bcryptjs';
import { IUser, IUserCredentials, IUserPublic } from '../interfaces/IUser';
import UserModel from '../database/models/User';
import RequestError from '../helper/RequestError';

class LoginService {
  public execute = async ({ email, password }: IUserCredentials) => {
    const user = await UserModel.findOne({ where: { email } }) as IUser;
    if (!user) throw new RequestError(StatusCodes.UNAUTHORIZED, 'Incorrect email or password');
    const checkPassword = compareSync(password, user.password);
    if (!checkPassword) {
      throw new RequestError(StatusCodes.UNAUTHORIZED, 'Incorrect email or password');
    }
    const { id, username, role } = user;
    return { id, username, role, email } as IUserPublic;
  };
}

export default LoginService;
