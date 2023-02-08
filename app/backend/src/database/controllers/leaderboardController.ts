import { Response, Request } from 'express';
import Leaderboard from '../LeaderBoard/Leaderboard';
import MatchesService from '../services/Matches.service';
import TeamsService from '../services/Teams.service';

export default class LeaderboardsController {
  constructor(private _service: MatchesService, private _teams: TeamsService) {}

  async createTable(req: Request, res: Response): Promise<Response> {
    const totalTeams = await this._teams.findAll();
    const result = totalTeams.map(async (e: any) => {
      const leaderBoard = new Leaderboard(e.id, e.teamName);
      const tabela = await leaderBoard.criaTabela();
      return tabela;
    });
    const trataPromise = await Promise.all(result);
    trataPromise.sort(
      (a: any, b: any) =>
        b.totalPoints - a.totalPoints
        || b.totalVictories - a.totalVictories
        || b.goalsBalance - a.goalsBalance
        || b.goalsFavor - a.goalsFavor
        || b.goalsOwn - a.goalsOwn,
    );
    return res.status(200).json(trataPromise);
  }
}
