import register from '../models/user';

async function registerUserController (req: any) {
  try {
    const email = req.body['email'];
    const password = req.body['password'];
    const data = await register.newUser(email, password);
    return {data: true}};
  } catch (err) {
    return (err);
  }
}

export default {
  registerUserController
};
