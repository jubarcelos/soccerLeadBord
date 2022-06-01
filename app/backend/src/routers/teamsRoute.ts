import { Router } from 'express';
import TeamsController from '../controller/Teams';
import TeamByIdController from '../controller/GetTeamById';

const teamsRoute = Router();
const teams = new TeamsController();
const team = new TeamByIdController();

teamsRoute.route('/')
  .get(teams.get);

teamsRoute.route('/:id')
  .get(team.get);

export default teamsRoute;
