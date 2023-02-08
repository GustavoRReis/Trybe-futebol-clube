import { Request, Response } from 'express';
import Matches from '../database/models/Matches';

type DataMatches = {
  homeTeamId: number;
  awayTeamId: number;
  homeTeamGoals: number;
  awayTeamGoals: number;
  insProgress: boolean;
};

interface IMatches {
  findAll(): Promise<Matches[]>;
  findAllInProgress(status: boolean): Promise<Matches[]>;
  createMatches(dataMatches: DataMatches): Promise<Matches>;
}

interface IMatchesController {
  findAll(req: Request, res: Response): Promise<Response>;
  createMatches(req: Request, res: Response): Promise<Response>
}

export { IMatches, IMatchesController, DataMatches };
