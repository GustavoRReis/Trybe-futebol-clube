import { Response, Request } from 'express';
import JsonWebToken from '../../middleware/jwt';
import { IUserController } from '../../interfaces/IUser';
import UserService from '../services/Users.Service';

const jwtController = new JsonWebToken();

export default class UserController implements IUserController {
  constructor(private _service: UserService) {}

  async findOne(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;
    const user = await this._service.findOne(email);
    if (user) {
      const obj = { email, password };
      const token = jwtController.generateToken(obj);
      req.headers.authorization = token;
      return res.status(200).json({ token });
    }
    return res.status(400).json({ message: 'Invalid email or password' });
  }

  async validateRole(req: Request, res: Response): Promise<Response> {
    const { user } = req.body;
    console.log('AQUIIIIII', user);
    const data = await this._service.findOne(user.email);
    if (!data) return res.status(404).json({ message: 'not found' });
    return res.status(200).json({ role: data.role });
  }
}
