import * as JWT from 'jsonwebtoken';
import { IUserLogin } from '../interfaces/IUser';

export default class JsonWebToken {
  public _secretKey: JWT.Secret = process.env.JWT_SECRET || 'jwt_secret';
  public _jwtConfig: JWT.SignOptions = { expiresIn: '15d', algorithm: 'HS256' };

  public generateToken(payload: IUserLogin) {
    const NewToken = JWT.sign({ ...payload }, this._secretKey, this._jwtConfig);
    return NewToken;
  }

  public decode(token: string) {
    const tokenIsValid = JWT.verify(token, this._secretKey);
    return tokenIsValid;
  }
}
