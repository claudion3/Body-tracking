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
