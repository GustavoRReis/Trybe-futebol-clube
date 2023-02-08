import * as express from 'express';
import MatchesController from '../database/controllers/MatchesController';
import MatchesService from '../database/services/Matches.service';
import { verifyFields, teamsExists, tokenIsValid } from '../middleware/matches.middleware';

const matchesRouter = express.Router();
const matchesService = new MatchesService();
const matchesController = new MatchesController(matchesService);

matchesRouter.get('/', (req, res) => matchesController.findAll(req, res));
matchesRouter.post(
  '/',
  verifyFields,
  teamsExists,
  /* auth, */
  tokenIsValid,
  (req, res) => matchesController.createMatches(req, res),
);

matchesRouter.patch(
  '/:id/finish',
  (req, res) => matchesController.changeInProgress(req, res),
);

matchesRouter.patch('/:id', (req, res) => matchesController.changeResults(req, res));

export default matchesRouter;
