import { Response, Request } from 'express';
import { ITeamsController } from '../../interfaces/ITeams';
import TeamsService from '../services/Teams.service';

export default class TeamsController implements ITeamsController {
  constructor(private _service: TeamsService) {}

  async findAll(req: Request, res: Response): Promise<Response> {
    const teams = await this._service.findAll();
    return res.status(200).json(teams);
  }

  async findById(req: Request, res: Response): Promise<Response> {
    const id = Number(req.params.id);
    const team = await this._service.findById(id);
    return res.status(200).json(team);
  }
}
