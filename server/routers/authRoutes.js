import express from 'express';
import { checkUser, google, login, logout, register } from '../controllers/authController.js';
import { verifyUser } from '../middleware/authMiddleware.js';



const router = express.Router();

router.route('/signup').post(register);
router.route('/signin').post(login);
router.route('/logout').post(logout);
router.route('/verify').get(verifyUser, checkUser);
router.route('/google').post(google);

export default router;