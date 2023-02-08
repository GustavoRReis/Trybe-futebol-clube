/* import chai, { expect } from 'chai';
 import * as sinon from 'sinon';
import chaiHttp from 'chai-http';
import {app} from '../../app';
import { Model } from 'sequelize';
import Users from '../../database/models/Users';
import userRouter from '../../routes/userRoutes';

chai.use(chaiHttp);


const mockToken = {
  email: 'gusta@trybe.com',
  password: 'password',
};

describe('/login', () => {
  before(() => sinon.stub(Model, 'findOne').resolves(mockToken as Users));
  after(() => sinon.restore());

  it('ao inserir os dados com sucesso, retorna um token', async () => {
    const response = await chai
      .request(app)
      .post('/login')
      .send(mockToken);

    expect(response.status).to.equal(201);
    expect(response.body).to.deep.equal({ id: 1, ...mockToken });
  });
});  */
