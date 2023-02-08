import * as express from 'express';
import UserService from '../database/services/Users.Service';
import UserController from '../database/controllers/UserController';
import {
  emailAndPasswordValidate,
  emailNotNull,
  passwordNotNull,
} from '../middleware/validateLogin';
import auth from '../middleware/auth.middleware';

const userRouter = express.Router();
const userService = new UserService();
const userController = new UserController(userService);

userRouter.post('/', emailNotNull, passwordNotNull, emailAndPasswordValidate, (req, res) =>
  userController.findOne(req, res));
userRouter.get('/validate', auth, (req, res) => userController.validateRole(req, res));

export default userRouter;
