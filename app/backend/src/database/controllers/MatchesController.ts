import { Response, Request } from 'express';
import { IMatchesController } from '../../interfaces/IMatches';
import MatchesService from '../services/Matches.service';

export default class MatchesController implements IMatchesController {
  constructor(private _service: MatchesService) {}

  async findAll(req: Request, res: Response): Promise<Response> {
    const { inProgress } = req.query;
    if (inProgress === 'true') {
      const matches = await this._service.findAllInProgress(true);
      return res.status(200).json(matches);
    }
    if (inProgress === 'false') {
      const matches = await this._service.findAllInProgress(false);
      return res.status(200).json(matches);
    }
    const matches = await this._service.findAll();
    return res.status(200).json(matches);
  }

  async createMatches(req: Request, res: Response): Promise<Response> {
    const result = req.body;
    const DATA = await this._service.createMatches(result);
    return res.status(201).json(DATA);
  }

  async changeInProgress(req: Request, res: Response): Promise<Response> {
    const ID = req.params.id;
    await this._service.changeInProgress(Number(ID));
    return res.status(200).json({ message: 'Finished' });
  }

  async changeResults(req: Request, res: Response): Promise<Response> {
    const ID = req.params.id;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    await this._service.changeResults(
      Number(ID),
      Number(homeTeamGoals),
      Number(awayTeamGoals),
    );
    return res.status(200).json({ message: 'deu' });
  }
}
