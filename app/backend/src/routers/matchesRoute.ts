import { Router } from 'express';
import MatchesController from '../controller/Matches';
// import Match from '../controller/CreateMatch';

const matchesRoute = Router();
const matches = new MatchesController();
// const match = new Match();

matchesRoute.route('/')
  .get(matches.get);
// .post(match.create);

// matchesRoute.route('/:id')
//   .get(matches.get);

export default matchesRoute;
