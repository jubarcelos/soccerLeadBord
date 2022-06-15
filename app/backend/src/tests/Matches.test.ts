import * as chai from 'chai';
import * as sinon from 'sinon';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import MatchModel from '../database/models/Match';
import { StatusCodes } from 'http-status-codes';
import { Match } from './mocks/Match';

chai.use(chaiHttp);
const { expect } = chai;
// https://stackoverflow.com/questions/37040853/chai-request-is-not-a-function-while-using-request-js-for-http-service-unit-test e Ronaldo Junior
// let chaiLib = <any>chai;
// let chaiRequestLib = chaiLib.default.request;

describe('Endpoint GET /matches', () => {
  const chaiHttpResponse = async (body?: string | object | undefined) => (
    chai.request(app).get('/matches')
  );
  describe('In fail case', () => {  
    beforeEach(async () => {
      sinon
        .stub(MatchModel, "findAll").rejects();
    });

    afterEach(()=>{
      (MatchModel.findAll as sinon.SinonStub).restore();
    })

    it('should return an error message if match is not found', async () => {
      const response = await chaiHttpResponse();
      expect(response.status).to.be.deep.equal(StatusCodes.INTERNAL_SERVER_ERROR);
      expect(response.body).to.haveOwnProperty('message');
      expect(response.body).to.be.eql({ message: 'server error'});
    });
  });
  
  describe('In success case', () => {  
    beforeEach(async () => {
      sinon
        .stub(MatchModel, "findAll")
        .resolves(Match as unknown as MatchModel[]);
    });

    afterEach(()=>{
      (MatchModel.findAll as sinon.SinonStub).restore();
    })

    it('should return an Match list', async () => {
      const response = await chaiHttpResponse();      
      expect(response.status).to.be.equal(StatusCodes.OK);
      expect(response.body[0]).to.haveOwnProperty('id');
      expect(response.body[0]).to.haveOwnProperty('homeTeam');
      expect(response.body[0]).to.haveOwnProperty('awayTeam');
      expect(response.body[0]).to.haveOwnProperty('homeTeamGoals');
      expect(response.body[0]).to.haveOwnProperty('awayTeamGoals');
      expect(response.body[0]).to.haveOwnProperty('inProgress');
      expect(response.body[0]).to.haveOwnProperty('teamHome');
      expect(response.body[0].teamHome).to.haveOwnProperty('teamName');
      expect(response.body[0]).to.haveOwnProperty('teamAway');
      expect(response.body[0].teamAway).to.haveOwnProperty('teamName');
      expect(response.body).to.be.eql(Match);
    });
  });
});
