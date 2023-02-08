import * as express from 'express';
import TeamsController from '../database/controllers/TeamsController';
import TeamsService from '../database/services/Teams.service';

const teamsRouter = express.Router();
const teamService = new TeamsService();
const teamsController = new TeamsController(teamService);

teamsRouter.get('/', (req, res) => teamsController.findAll(req, res));
teamsRouter.get('/:id', (req, res) => teamsController.findById(req, res));

export default teamsRouter;
