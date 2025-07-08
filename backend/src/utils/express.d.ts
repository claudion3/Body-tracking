// src/types/express.d.ts
import { IUser } from '../models/User';
import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
      userId: string;
    }
  }
}

export interface AuthenticatedRequest extends Request {
  userId: string;
  user?: IUser;
}

export interface ChangePasswordRequest extends AuthenticatedRequest {
  body: {
    oldPassword: string;
    newPassword: string;
  };
}