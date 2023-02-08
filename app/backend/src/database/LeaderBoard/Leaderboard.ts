import MatchesService from '../services/Matches.service';

const matchesService = new MatchesService();

export default class Leaderboard {
  private _idTeam: number;
  private _nameTeam: string;

  constructor(idTeam: number, nameTeam: string) {
    this._idTeam = idTeam;
    this._nameTeam = nameTeam;
  }

  get TeamName(): string {
    return this._nameTeam;
  }

  get idTeam(): number {
    return this._idTeam;
  }

  async getVencedor(): Promise<number> {
    let countWin = 0;
    const filterTeamid = await matchesService.findAllMatchesById(this.idTeam);
    filterTeamid.forEach((i: any) => {
      if (i.homeTeamGoals > i.awayTeamGoals) countWin += 1;
    });
    return countWin;
  }

  async getPerdedor(): Promise<number> {
    let countLoss = 0;
    const filterTeamid = await matchesService.findAllMatchesById(this.idTeam);
    filterTeamid.forEach((i: any) => {
      if (i.homeTeamGoals < i.awayTeamGoals) countLoss += 1;
    });
    return countLoss;
  }

  async getEmpate(): Promise<number> {
    let countDraw = 0;
    const filterTeamid = await matchesService.findAllMatchesById(this.idTeam);
    filterTeamid.forEach((i: any) => {
      if (i.homeTeamGoals === i.awayTeamGoals) countDraw += 1;
    });
    return countDraw;
  }

  async totaldePontos(): Promise<number> {
    const win = await this.getVencedor();
    const draw = await this.getEmpate();
    const total = win * 3 + draw;
    return total;
  }

  async totalJogos(): Promise<number> {
    let total = 0;
    const filterTeamid = await matchesService.findAllMatchesById(this.idTeam);
    filterTeamid.forEach((_index: any) => {
      total += 1;
    });
    return total;
  }

  async totalGolsCasa(): Promise<number> {
    let total = 0;
    const filterTeamid = await matchesService.findAllMatchesById(this.idTeam);
    filterTeamid.forEach((index: any) => {
      total += index.homeTeamGoals;
    });
    return total;
  }

  async totalGolsFora(): Promise<number> {
    let total = 0;
    const filterTeamid = await matchesService.findAllMatchesById(this.idTeam);
    filterTeamid.forEach((index: any) => {
      total += index.awayTeamGoals;
    });
    return total;
  }

  async saldoDeGols(): Promise<number> {
    const golsCasa = await this.totalGolsCasa();
    const golsFora = await this.totalGolsFora();
    const resultado = golsCasa - golsFora;
    return resultado;
  }

  async aproveitamento(): Promise<number> {
    const totalDePontos = await this.totaldePontos();
    const totalDeJogos = await this.totalJogos();
    const result = (totalDePontos / (totalDeJogos * 3)) * 100;
    return Number(result.toFixed(2));
  }

  async criaTabela() {
    const obj = {
      name: this.TeamName,
      totalPoints: await this.totaldePontos(),
      totalGames: await this.totalJogos(),
      totalVictories: await this.getVencedor(),
      totalDraws: await this.getEmpate(),
      totalLosses: await this.getPerdedor(),
      goalsFavor: await this.totalGolsCasa(),
      goalsOwn: await this.totalGolsFora(),
      goalsBalance: await this.saldoDeGols(),
      efficiency: await this.aproveitamento(),
    };
    return obj;
  }
}
