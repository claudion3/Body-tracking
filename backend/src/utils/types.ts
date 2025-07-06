import { Document } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

export interface IProgressEntry extends Document {
  userId: string;
  weight: number;
  hipSize: number;
  waistSize: number;
  date: Date;
}