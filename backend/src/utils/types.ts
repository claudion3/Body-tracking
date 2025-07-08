import { Document } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  fullName?: string;
  age?: number;
  gender?: 'male' | 'female' | 'other';
  height?: number;
  weight?: number;
  goalWeight?: number;
  activityLevel?: 'sedentary' | 'light' | 'active' | 'very active';
  avatarUrl?: string;
  joinedAt?: Date;
  lastLoginAt?: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}


export interface IProgressEntry extends Document {
  userId: string;
  weight: number;
  hipSize: number;
  waistSize: number;
  date: Date;
}