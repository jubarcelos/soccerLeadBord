import { Router } from 'express';
import MatchesController from '../controller/Matches';
import NewMatch from '../controller/CreateMatch';
import FinishedMatch from '../controller/FinishedMatch';
import UpdatedMatch from '../controller/UpdateMatch';
import * as Schema from '../schemas';

const matchesRoute = Router();
const matches = new MatchesController();
const newMatch = new NewMatch();
const updateMatch = new UpdatedMatch();
const finishedMatch = new FinishedMatch();

matchesRoute.route('/')
  .get(matches.get)
  .post(Schema.auth, newMatch.create);

matchesRoute.route('/:id')
  .patch(updateMatch.update)
  .patch(finishedMatch.update);

matchesRoute.route('/:id/finish')
  .patch(finishedMatch.update);

export default matchesRoute;
