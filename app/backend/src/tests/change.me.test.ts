import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';
import UserService from '../database/services/Users.Service';
import Users from '../database/models/Users';
import UserController from '../database/controllers/UserController';
import userRouter from '../routes/userRoutes';
import { Model } from 'sequelize';

chai.use(chaiHttp);

const { expect } = chai;
/**
 * Exemplo do uso de stubs com tipos
 */

// let chaiHttpResponse: Response;

// before(async () => {
//   sinon
//     .stub(Example, "findOne")
//     .resolves({
//       ...<Seu mock>
//     } as Example);
// });

// after(()=>{
//   (Example.findOne as sinon.SinonStub).restore();
// })

// it('...', async () => {
//   chaiHttpResponse = await chai
//      .request(app)
//      ...

//   expect(...)
// });
