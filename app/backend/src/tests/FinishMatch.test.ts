
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

describe.only('Endpoint patch /matches/id/finish', () => {
  const chaiHttpResponse = async (id: number, token: string) => (
    chai.request(app).patch(`/matches/${id}/finish`).set('Authorization', token)
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
      expect(response.body).to.be.deep.equal({ message:'Match Finished found'});
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

    it('should update the inProgress to false and return a message "finished"', async () => {
      const response = await chaiHttpResponse(1, 'validToken');
      expect(response.status).to.be.equal(StatusCodes.OK);
      expect(response.body).to.haveOwnProperty('message');
      expect(response.body.message).to.be.equal('Finished');
    });
  });
});