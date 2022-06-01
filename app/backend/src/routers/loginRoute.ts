import { Router } from 'express';
import LoginController from '../controller/Login';
import LoginValidateController from '../controller/LoginValidate';
import validator from '../middlewares/Validator';
import * as Schema from '../schemas';

const loginRoute = Router();
const login = new LoginController();
const loginValidate = new LoginValidateController();

loginRoute.route('/')
  .post(validator(Schema.body.login), login.execute);

loginRoute.route('/validate')
  .get(Schema.auth, loginValidate.execute);

export default loginRoute;
