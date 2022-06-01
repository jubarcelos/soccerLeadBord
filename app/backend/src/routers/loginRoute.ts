import { Router } from 'express';
import LoginController from '../controller/Login';
import validator from '../middlewares/Validator';
import * as Schema from '../schemas';

const loginRoute = Router();
const login = new LoginController();

loginRoute.route('/')
  .post(validator(Schema.body.login), login.execute);

export default loginRoute;
