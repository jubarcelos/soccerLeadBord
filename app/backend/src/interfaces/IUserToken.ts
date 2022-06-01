import { JwtPayload } from 'jsonwebtoken';

interface IUserToken extends JwtPayload {
  id: number,
  username: string,
  role: string,
  email: string,
}

export default IUserToken;
