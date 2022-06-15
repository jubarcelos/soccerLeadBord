import * as chai from 'chai';
import * as sinon from 'sinon';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import MatchModel from '../database/models/Match';
import { StatusCodes } from 'http-status-codes';
import { Match } from './mocks/Match';
import { IMatch } from '../interfaces/IMatch';


chai.use(chaiHttp);
const { expect } = chai;

describe('Endpoint patch /matches/id', () => {
  const chaiHttpResponse = async (id: number, token: string, body?: IMatch) => (
    chai.request(app).patch(`/matches/${id}`).send(body).set('Authorization', token)
  );
  const one = 1;
  describe('In fail case', () => {  
    beforeEach(async () => {
      sinon.stub(MatchModel, "findOne").resolves(null);
      sinon.stub(MatchModel, "update").resolves([one, []]);
    });

    afterEach(()=>{
      sinon.restore();
    })

    it('should return an error message if match id is not registered', async () => {
      const response = await chaiHttpResponse(5000, 'validToken');
      expect(response.status).to.be.deep.equal(StatusCodes.NOT_FOUND);
      expect(response.body).to.be.deep.equal({ message:'Match not found'});
    });
  });
  
  describe('In success case', () => {  
    beforeEach(async () => {
      sinon
        .stub(MatchModel, "findOne")
        .resolves(Match[0] as unknown as MatchModel);
      sinon.stub(MatchModel, "update").resolves([one, []]);
    });

    afterEach(()=>{
      sinon.restore();
    })

    it('should return an match data', async () => {
      
      const response = await chaiHttpResponse(1, 'validToken');
      expect(response.status).to.be.equal(StatusCodes.OK);
      expect(response.body).to.haveOwnProperty('message');
      expect(response.body.message).to.be.equal('Match was successfully updated');
    });
  });
});