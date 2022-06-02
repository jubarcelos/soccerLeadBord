import { Router } from 'express';
import MatchesController from '../controller/Matches';

const matchesRoute = Router();
const matches = new MatchesController();

matchesRoute.route('/')
  .get(matches.get);

// matchesRoute.route('/:id')
//   .get(matches.get);

export default matchesRoute;
