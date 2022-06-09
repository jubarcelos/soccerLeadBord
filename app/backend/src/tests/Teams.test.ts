import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import TeamModel from '../database/models/Team';
import Team from './mocks/Team';
import { StatusCodes } from 'http-status-codes';
import ITeam from '../interfaces/ITeam';


chai.use(chaiHttp);

const { expect } = chai;

describe('Endpoint GET /teams', () => {
  const chaiHttpResponse = async (body?: string | object | undefined) => (
    chai.request(app).get('/teams')
  );
  describe('In fail case', () => {  
    beforeEach(async () => {
      sinon
        .stub(TeamModel, "findAll").rejects();
    });

    afterEach(()=>{
      (TeamModel.findAll as sinon.SinonStub).restore();
    })

    it('should return an error message if team is not found', async () => {
      const response = await chaiHttpResponse();
      expect(response.status).to.be.deep.equal(StatusCodes.INTERNAL_SERVER_ERROR);
      expect(response.body).to.haveOwnProperty('message');
      expect(response.body).to.be.eql({ message: 'server error'});
    });
  });
  
  describe('In success case', () => {  
    beforeEach(async () => {
      sinon
        .stub(TeamModel, "findAll")
        .resolves(Team as TeamModel[]);
    });

    afterEach(()=>{
      (TeamModel.findAll as sinon.SinonStub).restore();
    })

    it('should return an team list', async () => {
      const response = await chaiHttpResponse();      
      expect(response.status).to.be.equal(StatusCodes.OK);
      expect(response.body[0]).to.haveOwnProperty('id');
      expect(response.body[0]).to.haveOwnProperty('teamName');
      expect(response.body).to.be.eql(Team);
    });
  });
});
describe('Endpoint GET /teams/id', () => {
  const chaiHttpResponse = async (id: number) => (
    chai.request(app).get(`/teams/${id}`)
  );
  describe('In fail case', () => {  
    beforeEach(async () => {
      sinon
        .stub(TeamModel, "findOne").resolves(null);
    });

    afterEach(()=>{
      (TeamModel.findOne as sinon.SinonStub).restore();
    })

    it('should return an error message if team id is not registered', async () => {
      const response = await chaiHttpResponse(5000);
      expect(response.status).to.be.deep.equal(StatusCodes.UNAUTHORIZED);
      expect(response.body).to.haveOwnProperty('message');
      expect(response.body).to.be.deep.equal({ message:'Team not registered'});
    });
  });
  
  describe('In success case', () => {  
    beforeEach(async () => {
      sinon
        .stub(TeamModel, "findOne")
        .resolves(Team[0] as TeamModel);
    });

    afterEach(()=>{
      (TeamModel.findOne as sinon.SinonStub).restore();
    })

    it('should return an team data', async () => {
      const response = await chaiHttpResponse(1);
      expect(response.status).to.be.equal(StatusCodes.OK);
      expect(response.body).to.haveOwnProperty('id');
      expect(response.body).to.haveOwnProperty('teamName');
      expect(response.body).to.be.eql(Team[0] as ITeam);
    });
  });
});