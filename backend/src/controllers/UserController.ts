import { Request, Response } from 'express';
import User from '../models/User';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { AuthenticatedRequest } from '../utils/express.d';
import { IUser } from '../utils/types';

// Signup controller
export const signup = async (req: Request, res: Response): Promise<void> => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).send({ error: 'User already exists' });
      return;
    }

    const user = new User({ username, email, password });
    await user.save();

    const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET || 'MY_SECRET_KEY_MY_SECRET_KEY_MY_SECRET_KEY',
        { expiresIn: '1h' }
    );

    res.status(201).send({ token });
  } catch (err) {
    res.status(400).send({ error: 'Error creating user' });
  }
};

// Login controller
export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }) as IUser;
    if (!user) {
      res.status(404).send({ error: 'User not found' });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).send({ error: 'Invalid credentials' });
      return;
    }

    const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET || 'MY_SECRET_KEY_MY_SECRET_KEY_MY_SECRET_KEY',
        { expiresIn: '1h' }
    );

    res.send({ token });
  } catch (err) {
    res.status(500).send({ error: 'Error logging in' });
  }
};

// Get profile
export const getUserProfile = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.user?.userId).select('-password');
    if (!user) {
      res.status(404).send({ error: 'User not found' });
      return;
    }
    res.send(user);
  } catch (err) {
    res.status(500).send({ error: 'Error fetching user profile' });
  }
};

// Update profile
export const updateUserProfile = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    'username',
    'email',
    'fullName',
    'age',
    'gender',
    'height',
    'weight',
    'goalWeight',
    'activityLevel',
    'avatarUrl',
  ];

  const isValidOperation = updates.every(update => allowedUpdates.includes(update));
  if (!isValidOperation) {
    res.status(400).send({ error: 'Invalid updates!' });
    return;
  }

  try {
    const user = await User.findById(req.user?.userId) as IUser;
    if (!user) {
      res.status(404).send({ error: 'User not found' });
      return;
    }

    updates.forEach(update => {
      (user as any)[update] = req.body[update];
    });

    await user.save();
    res.send(user);
  } catch (err) {
    res.status(400).send({ error: 'Error updating profile' });
  }
};

// Change password
export const changePassword = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const { oldPassword, newPassword } = req.body;

  try {
    const user = await User.findById(req.user?.userId) as IUser;
    if (!user) {
      res.status(404).send({ error: 'User not found' });
      return;
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      res.status(401).send({ error: 'Old password is incorrect' });
      return;
    }

    user.password = newPassword;
    await user.save();
    res.send({ message: 'Password updated successfully' });
  } catch (err) {
    res.status(500).send({ error: 'Error changing password' });
  }
};

// Delete account
export const deleteAccount = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    await User.findByIdAndDelete(req.user?.userId);
    res.send({ message: 'Account deleted successfully' });
  } catch (err) {
    res.status(500).send({ error: 'Error deleting account' });
  }
};
