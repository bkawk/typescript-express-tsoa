import { UserModel } from '../models/user';
import { Route, Get, Controller, Post, BodyProp, Put, Delete, SuccessResponse, Tags, Body, OperationId, Response, Security } from 'tsoa';
import { description } from 'joi';


export interface IResponse {
  message: string;
  status: string;
  data: any;
}

export interface RUserw {
  email: string;
  password: string;
}

@Route('/api/register')
export class RegisterController extends Controller {
  /**
   * This is a description of the register user method
   */
  @Post('/user')
  @Tags("Users")
  @OperationId('registerUser')
  @Response<IResponse>('400', 'Bad Request')
  @SuccessResponse('200', 'OK')
  public async createUser(@Body() body: RUserw): Promise<IResponse> {
    try {
      const user = new UserModel(body);
      await user.save();
      const response = {
        message: "ok",
        status: "200",
        data: body,
      }
      return response;
    }
    catch(err) {
      this.setStatus(400);
      const response = {
        message: "fail",
        status: "400",
        data: err,
      }
      return response;
    } 

  }
}
