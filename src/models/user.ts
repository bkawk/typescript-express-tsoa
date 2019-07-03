import * as mongoose from 'mongoose';

interface IUser extends mongoose.Document {
  email: string;
  password: string;
}

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

const UserModel = mongoose.model('User', UserSchema);

export { UserModel, IUser }
