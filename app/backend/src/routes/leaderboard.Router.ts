import * as express from 'express';
import MatchesService from '../database/services/Matches.service';
import LeaderboardsController from '../database/controllers/leaderboardController';
import TeamsService from '../database/services/Teams.service';

const leaderboardRouter = express.Router();
const macthesService = new MatchesService();
const teamsService = new TeamsService();
const leaderController = new LeaderboardsController(macthesService, teamsService);

leaderboardRouter.get('/home', (req, res) => leaderController.createTable(req, res));
export default leaderboardRouter;
