import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import UserModel from '../database/models/User';


import { User, UserPublic } from './mocks/User';
import { StatusCodes } from 'http-status-codes';
import { ILoggedUser } from '../interfaces/IUser';
import Jwt from '../helper/Jwt';


chai.use(chaiHttp);

const { expect } = chai;

describe('Endpoint POST /login', () => {
  const chaiHttpResponse = async (body: string | object | undefined) => (
    chai.request(app).post('/login').send(body)
  );
  describe('In fail case', () => {  
    beforeEach(async () => {
      sinon
        .stub(UserModel, "findOne").resolves(null);
    });

    afterEach(()=>{
      (UserModel.findOne as sinon.SinonStub).restore();
    })

    it('should return an error message if email is not found', async () => {
      
      const response = await chaiHttpResponse({ email: 'not@found.br', password: 'password' });
      expect(response.status).to.be.deep.equal(StatusCodes.UNAUTHORIZED);
      expect(response.body).to.haveOwnProperty('message');
      expect(response.body).to.be.deep.equal({ message:'Incorrect email or password'});
    });

    it('should return an error message if password does not checked', async () => {
      (UserModel.findOne as sinon.SinonStub).restore();
      sinon.stub(UserModel, "findOne").resolves(User[1] as UserModel);
      const response = await chaiHttpResponse({ email: 'user@user.br', password: 'password' });
      expect(response.status).to.be.deep.equal(StatusCodes.UNAUTHORIZED);
      expect(response.body).to.haveOwnProperty('message');
      expect(response.body).to.be.deep.equal({ message:'Incorrect email or password'});
    });

    it('should return an error message if the user did not sent a validate email or password', async () => {
      const responses ={
        responde: await chaiHttpResponse({ email: 'not@found.br', password: '' }),
        responseTwo: await chaiHttpResponse({ email: 'not@found.br', password: 'word' }),
        responseThree: await chaiHttpResponse({ email: 'not@br', password: 'password' }),
        responseFour: await chaiHttpResponse({ email: '', password: 'password' }),
        responseFive: await chaiHttpResponse({ email: 'notBr', password: 'password' }),
      }
      const array = Object.values(responses);
      array.map((response) => { 
        expect(response.status).to.be.deep.equal(StatusCodes.BAD_REQUEST);
        expect(response.body).to.haveOwnProperty('message');
        expect(response.body).to.be.deep.equal({ message:'All fields must be filled'});
      });
    });
  });
  
  describe('In success case', () => {  
    beforeEach(async () => {
      sinon
        .stub(UserModel, "findOne")
        .resolves(User[1] as UserModel);
    });

    afterEach(()=>{
      (UserModel.findOne as sinon.SinonStub).restore();
    })
    
    it('should return an token', async () => {
      const jwt = new Jwt();
      const response = await chaiHttpResponse({ email: User[1].email, password:'secret_user' });     
      expect(response.status).to.be.equal(StatusCodes.OK);
      expect(response.body).to.haveOwnProperty('user');
      expect(response.body).to.haveOwnProperty('token');
      expect(response.body).to.be.eql({
        user: UserPublic[1],
        token: jwt.sign(UserPublic[1]),
      });
    });
  });
});
