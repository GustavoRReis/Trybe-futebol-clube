import { Request, Response } from 'express';
import Teams from '../database/models/Teams';

interface ITeams {
  findAll(): Promise<Teams[]>;
  findById(id: number): Promise<Teams>;
}

interface ITeamsController {
  findAll(req: Request, res: Response): Promise<Response>;
  findById(req: Request, res: Response): Promise<Response>;
}

export { ITeams, ITeamsController };
