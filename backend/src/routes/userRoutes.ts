import express from 'express';
import { changePassword, deleteAccount, getUserProfile, updateUserProfile  } from '../controllers/UserController';
import auth from '../middleware/auth';  // Assuming your auth middleware file exports default

const router = express.Router();

router.get('/me', auth, getUserProfile);
router.put('/me', auth, updateUserProfile);
router.put('/me/change-password', auth, changePassword);
router.delete('/me', auth, deleteAccount);

export default router;
