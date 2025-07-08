import express from 'express';
import { addProgressEntry, getProgressEntries } from '../controllers/ProgressController';
import auth from '../middleware/auth';

const router = express.Router();

// Add progress entry
router.post('/', auth, addProgressEntry);

// Get all progress entries for the user
router.get('/', auth, getProgressEntries);

export default router;
