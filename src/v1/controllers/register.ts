import register from '../models/user';
import { Request } from 'express';

async function registerUserController (req: Request) {
  try {
    const {email, password} = req.body;
    const data = await register.newUser(email, password);
    return {data: true}
  }
  catch(err) {
    return err;
  } 
}

export default {
  registerUserController
};
