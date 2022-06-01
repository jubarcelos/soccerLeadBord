import * as joi from 'joi';
import { celebrate, Joi, Segments } from 'celebrate';

const allFilled = { 'any.unknown': 'All fields must be filled' };

const body = {
  login: joi.object().keys({
    email: joi.string().required()
      .messages(allFilled),
    password: joi.string().min(6).required()
      .messages(allFilled),
  }),
  user: joi.object().keys({
    username: joi.string().min(3).required(),
    role: joi.string().min(3).required(),
    email: joi.string().email({ minDomainSegments: 2 }).lowercase().required(),
    password: joi.string().min(6).required(),
  }),
  team: joi.object().keys({
    teamName: joi.string().min(3).required(),
  }),
  match: joi.object().keys({
    teamName: joi.string().min(3).required(),
    homeTeam: joi.number().required(),
    homeTeamGoals: joi.number().required(),
    awayTeam: joi.number().required(),
    awayTeamGoals: joi.number().required(),
    inProgress: joi.boolean().required(),
  }),
};

const auth = celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required(),
  }).unknown(),
});

export { body, auth };
