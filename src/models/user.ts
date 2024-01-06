import { Schema, model, Document } from 'mongoose';

interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface UserDocument extends User, Document {}

const userSchema = new Schema<UserDocument>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const UserModel = model<UserDocument>('User', userSchema);

export default UserModel;
