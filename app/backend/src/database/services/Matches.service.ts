import { DataMatches, IMatches } from '../../interfaces/IMatches';
import Matches from '../models/Matches';
import Teams from '../models/Teams';

export default class MatchesService implements IMatches {
  private _db = Matches;

  async findAll(): Promise<Matches[] | any> {
    const matches = await this._db.findAll({
      include: [
        { model: Teams, as: 'homeTeam' },
        { model: Teams, as: 'awayTeam' },
      ],
    });
    if (!matches) return { message: 'No matches found' };
    return matches;
  }

  public async findAllInProgress(bool: boolean): Promise<Matches[] | any> {
    const result = await this._db.findAll({
      include: [
        { model: Teams, as: 'homeTeam' },
        { model: Teams, as: 'awayTeam' },
      ],
      where: { inProgress: bool },
    });
    return result;
  }

  async createMatches(dataMatches: DataMatches): Promise<Matches> {
    const DATA = {
      homeTeamId: Number(dataMatches.homeTeamId),
      awayTeamId: Number(dataMatches.awayTeamId),
      homeTeamGoals: Number(dataMatches.homeTeamGoals),
      awayTeamGoals: Number(dataMatches.awayTeamGoals),
      inProgress: true,
    };
    const result = await this._db.create(DATA);
    console.log(result);
    return result;
  }

  async changeInProgress(id: number): Promise<void> {
    await this._db.update({ inProgress: false }, { where: { id } });
  }

  async changeResults(
    id: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ): Promise<Response | any> {
    const partida = await this._db.findByPk(id);
    if (partida?.inProgress) {
      await this._db.update({ homeTeamGoals }, { where: { id } });
      await this._db.update({ awayTeamGoals }, { where: { id } });
    }
    return 'fim de papo';
  }

  public async findAllMatchesById(id: number): Promise<Matches[] | any> {
    const result = await this._db.findAll();
    const resultFilter = result.filter(
      (index) => index.homeTeamId === id && index.inProgress === false,
    );
    return resultFilter;
  }
}
