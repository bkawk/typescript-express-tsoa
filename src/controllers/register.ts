import { UserModel, IUser } from '../models/user';
import { Route, Get, Controller, Post, BodyProp, Put, Delete, SuccessResponse } from 'tsoa';

@Route('/api/register')
export class RegisterController extends Controller {
  @Post('/user')
  public async create(@BodyProp('email') email: string, @BodyProp('password') password: string): Promise<void> {
        const user : IUser =  new UserModel({email, password});
        await user.save();
  }
}
