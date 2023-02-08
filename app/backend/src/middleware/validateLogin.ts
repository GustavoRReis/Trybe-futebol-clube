import { NextFunction, Request, Response } from 'express';
import * as bcrypt from 'bcryptjs';
import UserService from '../database/services/Users.Service';

const emailNotNull = (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }
  return next();
};

const passwordNotNull = (req: Request, res: Response, next: NextFunction) => {
  const { password } = req.body;
  if (!password) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }
  return next();
};

const emailAndPasswordValidate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { email, password } = req.body;
  const obj = new UserService();
  const DATA = await obj.findOne(email);

  if (!DATA) {
    return res.status(401).json({ message: 'Incorrect email or password' });
  }

  const truePassword = bcrypt.compareSync(password, DATA.password);

  if (!truePassword) {
    return res.status(401).json({ message: 'Incorrect email or password' });
  }

  return next();
};

export { emailNotNull, passwordNotNull, emailAndPasswordValidate };
