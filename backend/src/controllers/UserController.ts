import { Request, Response } from 'express';
import User from '../models/User';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// Ensure explicit return type as Promise<void>
export const signup = async (req: Request, res: Response): Promise<void> => {
  const { username, email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).send({ error: 'User already exists' });
      return; // Ensure early return
    }

    // Create a new user
    const user = new User({ username, email, password });
    await user.save();

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'MY_SECRET_KEY_MY_SECRET_KEY_MY_SECRET_KEY', {
      expiresIn: '1h',
    });

    res.status(201).send({ token });
  } catch (err) {
    res.status(400).send({ error: 'Error creating user' });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).send({ error: 'User not found' });
      return;
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).send({ error: 'Invalid credentials' });
      return;
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'MY_SECRET_KEY_MY_SECRET_KEY_MY_SECRET_KEY', {
      expiresIn: '1h',
    });

    res.send({ token });
  } catch (err) {
    res.status(500).send({ error: 'Error logging in' });
  }
};

// In your userController.ts
export const getUserProfile = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }
    res.send(user);
  } catch (err) {
    res.status(500).send({ error: 'Error fetching user profile' });
  }
};

export const updateUserProfile = async (req: Request, res: Response) => {
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
    'avatarUrl'
  ];
  
  const isValidOperation = updates.every(update => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }

    updates.forEach(update => {
      // Use type assertion for dynamic property access
      (user as any)[update] = req.body[update];
    });
    
    await user.save();
    res.send(user);
  } catch (err) {
    res.status(400).send({ error: 'Error updating profile' });
  }
};

export const changePassword = async (req: Request, res: Response) => {
  const { oldPassword, newPassword } = req.body;

  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(401).send({ error: 'Old password is incorrect' });
    }

    user.password = newPassword;
    await user.save();
    res.send({ message: 'Password updated successfully' });
  } catch (err) {
    res.status(500).send({ error: 'Error changing password' });
  }
};

export const deleteAccount = async (req: Request, res: Response) => {
  try {
    await User.findByIdAndDelete(req.userId);
    res.send({ message: 'Account deleted successfully' });
  } catch (err) {
    res.status(500).send({ error: 'Error deleting account' });
  }
};