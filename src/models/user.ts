import { Schema, model, Document } from 'mongoose';

interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
}

interface UserDocument extends User, Document {}

const userSchema = new Schema<UserDocument>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
});

const UserModel = model<UserDocument>('User', userSchema);

export { UserDocument } 
export default UserModel;
