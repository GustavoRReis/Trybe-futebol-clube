import { Request, Response, NextFunction } from 'express';
import JsonWebToken from './jwt';

const DATAJWT = new JsonWebToken();

const auth = (req: Request, res: Response, next: NextFunction) => {
  /* console.log('oi'); */
  const token = req.headers.authorization;
  if (!token) {
    return res.status(400).json({ message: 'Token must be a valid token' });
  }
  const resultToken = DATAJWT.decode(token);
  req.body.user = resultToken;
  console.log('token valido', token);
  return next();
};

export default auth;
