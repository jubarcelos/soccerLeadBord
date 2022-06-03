import { Router } from 'express';
import MatchesController from '../controller/Matches';
import NewMatch from '../controller/CreateMatch';
import ChangeMatch from '../controller/FinishedMatch';
import * as Schema from '../schemas';

const matchesRoute = Router();
const matches = new MatchesController();
const newMatch = new NewMatch();
const changeMatch = new ChangeMatch();

matchesRoute.route('/')
  .get(matches.get)
  .post(Schema.auth, newMatch.create);

matchesRoute.route('/:id/finish')
  .patch(changeMatch.update);

export default matchesRoute;
