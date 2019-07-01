import * as mongoose from 'mongoose';

interface IUser extends mongoose.Document {
  email: string;
  password: string;
}

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

async function newUser(email: string, password: string) {
  const UserModel = mongoose.model<IUser>('User', UserSchema);
  const user : IUser =  new UserModel({email, password});
  await user.save();
}


//const UserModel = mongoose.model('User', UserSchema);

export default {
  newUser
};
