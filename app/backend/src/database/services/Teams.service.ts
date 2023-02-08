import { ITeams } from '../../interfaces/ITeams';
import Teams from '../models/Teams';

export default class TeamsService implements ITeams {
  private _db = Teams;

  async findAll(): Promise<Teams[] | any> {
    const teams = await this._db.findAll();
    return teams;
  }

  async findById(id: number): Promise<Teams> {
    const team = await this._db.findByPk(id);
    return team as Teams;
  }
}
