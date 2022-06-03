import { Router } from 'express';
import MatchesController from '../controller/Matches';
import Match from '../controller/CreateMatch';
import * as Schema from '../schemas';

const matchesRoute = Router();
const matches = new MatchesController();
const match = new Match();

matchesRoute.route('/')
  .get(matches.get)
  .post(Schema.auth, match.create);

// matchesRoute.route('/:id')
//   .get(matches.get);

export default matchesRoute;
