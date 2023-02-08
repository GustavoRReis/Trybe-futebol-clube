import { Request, Response } from 'express';
import Users from '../database/models/Users';

interface IUser {
  findOne(email: string): Promise<Users>;
}

interface IUserLogin {
  email: string;
  password: string;
}

interface IUserController {
  findOne(req: Request, res: Response): Promise<Response>;
}

export { IUser, IUserLogin, IUserController };
