import { IUser } from '../../interfaces/IUser';
import Users from '../models/Users';

export default class UserService implements IUser {
  private _db = Users;

  async findOne(email: string): Promise<Users> {
    const user = await this._db.findOne({ where: { email } });
    console.log(user?.dataValues);
    return user?.dataValues as Users;
  }
}
