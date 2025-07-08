import { Request, Response } from 'express';
import ProgressEntry from '../models/ProgressEntry';
import User from '../models/User';

interface AuthRequest extends Request {
  user?: { userId: string };
}

const isValidMeasurement = (weight: any, hipSize: any, waistSize: any): boolean => {
  return (
      typeof weight === 'number' &&
      typeof hipSize === 'number' &&
      typeof waistSize === 'number' &&
      weight > 0 &&
      hipSize > 0 &&
      waistSize > 0
  );
};

export const addProgressEntry = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Unauthorized: User not authenticated' });
      return;
    }

    const { weight, hipSize, waistSize } = req.body;

    if (!isValidMeasurement(weight, hipSize, waistSize)) {
      res.status(400).json({ error: 'Invalid input: All values must be positive numbers' });
      return;
    }

    const progressEntry = new ProgressEntry({
      userId: req.user.userId,
      weight,
      hipSize,
      waistSize,
    });

    await progressEntry.save();

    const updatedUser = await User.findByIdAndUpdate(
        req.user.userId,
        {
          weight,
          hipSize,
          waistSize,
          lastLoginAt: new Date(), // optional
        },
        { new: true }
    ).select('-password'); // remove sensitive fields

    res.status(201).json({
      message: 'Progress entry added successfully',
      progressEntry,
      updatedProfile: updatedUser,
    });
  } catch (err) {
    console.error('Error in addProgressEntry:', err);
    res.status(500).json({ error: 'Server error while saving progress entry' });
  }
};

export const getProgressEntries = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Unauthorized: User not authenticated' });
      return;
    }

    const entries = await ProgressEntry.find({ userId: req.user.userId }).sort({ date: -1 });
    res.status(200).json(entries);
  } catch (err) {
    console.error('Error in getProgressEntries:', err);
    res.status(500).json({ error: 'Server error while fetching progress entries' });
  }
};
