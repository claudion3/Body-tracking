import { Request, Response } from 'express';
import ProgressEntry from '../models/ProgressEntry';

// Extend Request to include user
interface AuthRequest extends Request {
  user?: { userId: string };
}

export const addProgressEntry = async (req: AuthRequest, res: Response): Promise<void> => {
  const { weight, hipSize, waistSize } = req.body;

  try {
    if (!req.user) {
      res.status(401).send({ error: 'User not authenticated' });
      return;
    }

    const progressEntry = new ProgressEntry({
      userId: req.user.userId,
      weight,
      hipSize,
      waistSize,
    });

    await progressEntry.save();
    res.status(201).send(progressEntry);
  } catch (err) {
    res.status(400).send({ error: 'Error saving progress entry' });
  }
};

export const getProgressEntries = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).send({ error: 'User not authenticated' });
      return;
    }

    const entries = await ProgressEntry.find({ userId: req.user.userId });
    res.send(entries);
  } catch (err) {
    res.status(500).send({ error: 'Error fetching progress entries' });
  }
};