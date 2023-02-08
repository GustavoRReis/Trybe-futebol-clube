import { Request, Response, NextFunction } from 'express';
import TeamsService from '../database/services/Teams.service';
import JsonWebToken from './jwt';

const teamService = new TeamsService();
const DATAJWT = new JsonWebToken();

const verifyFields = (req: Request, res: Response, next: NextFunction) => {
  const { homeTeamId, awayTeamId } = req.body;
  if (homeTeamId === awayTeamId) {
    return res.status(422).json({
      message: 'It is not possible to create a match with two equal teams',
    });
  }
  return next();
};

const teamsExists = async (req: Request, res: Response, next: NextFunction) => {
  const { homeTeamId, awayTeamId } = req.body;
  const teamHome = await teamService.findById(Number(homeTeamId));
  const teamAway = await teamService.findById(Number(awayTeamId));
  if (!teamHome || !teamAway) {
    return res.status(404).json({ message: 'There is no team with such id!' });
  }
  return next();
};

const tokenIsValid = (req: Request, res: Response, next: NextFunction) => {
  /* console.log('oi'); */
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
  try {
    const resultToken = DATAJWT.decode(token);
    if (!resultToken) {
      throw new Error('err');
    }
    req.body.user = resultToken;
    return next();
  } catch (err) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
};
export { verifyFields, teamsExists, tokenIsValid };
