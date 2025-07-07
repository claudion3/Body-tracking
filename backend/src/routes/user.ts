import express from 'express';
import { changePassword, deleteAccount, getUserProfile, updateUserProfile  } from '../controllers/UserController';
import auth from '../middleware/auth';  // Assuming your auth middleware file exports default

const router = express.Router();

// router.get('/', auth, getUserProfile);
// router.put('/', auth, updateUserProfile);
// router.put('/change-password', auth, changePassword);
// router.delete('/delete-account', auth, deleteAccount);

export default router;
