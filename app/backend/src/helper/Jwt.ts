import { readFileSync } from 'fs';
import { verify, sign, SignOptions } from 'jsonwebtoken';
import { IUserPlublic } from '../interfaces/IUser';

class Jwt {
  private _secret: string;
  private _config: SignOptions;

  constructor() {
    this._secret = readFileSync('./jwt.evaluation.key', { encoding: 'utf-8' });
    this._config = {
      expiresIn: '5d',
    };
  }

  public sign(data: IUserPlublic) {
    const token = sign(data, this._secret, this._config);
    return token;
  }

  public verify(token: string) {
    return verify(token, this._secret);
  }
}

export default Jwt;

// const test = new Jwt();
// test.sign(user);

// const secret = process.env.JWT_SECRET || 'senha';

// interface IError {
//   name: string;
// }
