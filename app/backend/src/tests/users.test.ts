import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';
import * as jwt from 'jsonwebtoken';
import { Response } from 'superagent';
import UserService from '../database/services/Users.Service';
import Users from '../database/models/Users';
import UserController from '../database/controllers/UserController';
import userRouter from '../routes/userRoutes';
import { Model } from 'sequelize';
import JsonWebToken from '../middleware/jwt';

chai.use(chaiHttp);

const { expect } = chai;

it('Deve retornar status 200', async () => {
  const httpResponse = await chai.request(app).post('/login').send({
    email: 'admin@admin.com',
    password: 'secret_admin',
  });

  expect(httpResponse.status).to.be.deep.equal(200);
  // expect(httpResponse.body).to.be.deep.equal({ token });
});

describe('Testes de Users e Login', () => {
  const UService = new UserService();

  it('Deveria instanciar com sucesso um novo userService', () => {
    expect(UService).to.be.instanceOf(UserService);
  });

  it('Deveria verificar seus atributos', () => {
    expect(UService).to.haveOwnProperty('_db');
    expect(UService).to.not.haveOwnProperty('id');
  });
});

describe('/login', () => {
  after(() => sinon.restore());

  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAdXNlci5jb20iLCJwYXNzd29yZCI6InNlY3JldF91c2VyIiwiaWF0IjoxNjc0NzQ0NDE3LCJleHAiOjE2NzYwNDA0MTd9.zYLLb9ZFXTyRglDjyfJwVryS4e1v_RP3Da56LoJktpY';

  const mockToken = {
    id: '1',
    email: 'gusta@trybe.com',
    username:'gustavo',
    role: 'gustavo',
    password: 'password',
  };

/* it('retorna 201', async () => {
  sinon.stub(Model, 'findOne').resolves(mockToken as any);

  const response = await chai
    .request(app)
    .post('/login')
    .send({ email: 'gusta@trybe.com', password: 'password' });

  const decodedToken = jwt.verify(token, 'JWT')


  expect(response.status).to.be.equal(201);
  
}); */

  it('retorna 401 sem validar token no email', async () => {
    sinon.stub(Model, 'findOne').resolves(mockToken as any);
    const response = await chai
      .request(app)
      .post('/login')
      .send({ email: 'gusta@trybe.com', password: 'password' });

    expect(response.status).to.be.equal(401);
    expect(response.body).to.be.deep.equal({
      message: 'Incorrect email or password',
    });
  });

  it('retorna 401 sem validar token na senha', async () => {
    const response = await chai
      .request(app)
      .post('/login')
      .send({ email: 'gusta@trybe.com', password: 'password' });

    expect(response.status).to.be.equal(401);
    expect(response.body).to.be.deep.equal({
      message: 'Incorrect email or password',
    });
  });

  it('retorna 400 sem passar o email', async () => {
    const response = await chai
      .request(app)
      .post('/login')
      .send({ email: '', password: 'password' });

    expect(response.status).to.be.equal(400);
    expect(response.body).to.be.deep.equal({
      message: 'All fields must be filled',
    });
  });

  it('retorna 400 sem passar a senha', async () => {
    const response = await chai
      .request(app)
      .post('/login')
      .send({ email: 'gusta@trybe.com', password: '' });

    expect(response.status).to.be.equal(400);
    expect(response.body).to.be.deep.equal({
      message: 'All fields must be filled',
    });
  });
});

