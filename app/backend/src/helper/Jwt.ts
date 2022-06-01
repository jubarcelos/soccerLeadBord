import { readFileSync } from 'fs';
import { verify, sign, SignOptions } from 'jsonwebtoken';
import IUserToken from '../interfaces/IUserToken';
import { IUserPublic } from '../interfaces/IUser';

class Jwt {
  private _secret: string;
  private _config: SignOptions;

  constructor() {
    this._secret = readFileSync('./jwt.evaluation.key', { encoding: 'utf-8' });
    this._config = {
      expiresIn: '5d',
    };
  }

  public sign(data: IUserPublic) {
    const token = sign(data, this._secret, this._config);
    return token;
  }

  public verify(token: string) {
    return verify(token, this._secret) as IUserToken;
  }
}

export default Jwt;
