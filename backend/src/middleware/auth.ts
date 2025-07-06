import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Extend Request to include user property
interface AuthRequest extends Request {
  user?: { userId: string };
}

const auth = (req: AuthRequest, res: Response, next: NextFunction): void => {
    const token = req.header('Authorization')?.replace('Bearer ', '').trim();

  if (!token) {
    res.status(401).send({ error: 'Access denied. No token provided.' });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'MY_SECRET_KEY_MY_SECRET_KEY_MY_SECRET_KEY') as { userId: string };
    req.user = { userId: decoded.userId }; // Attach user data to request
    next(); // Call next middleware
  } catch (err) {
    res.status(400).send({ error: 'Invalid token.' });
  }
};

export default auth;
