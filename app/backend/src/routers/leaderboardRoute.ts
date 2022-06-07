import { Router } from 'express';
import Leaderboard from '../controller/Leaderboard';
import HomeBoard from '../controller/HomeBoard';
import AwayBoard from '../controller/AwayBoard';

const leaderboardRoute = Router();
const leaderboard = new Leaderboard();
const homeBoard = new HomeBoard();
const awayBoard = new AwayBoard();

leaderboardRoute.route('/')
  .get(leaderboard.get);
leaderboardRoute.route('/home')
  .get(homeBoard.get);
leaderboardRoute.route('/away')
  .get(awayBoard.get);

export default leaderboardRoute;
