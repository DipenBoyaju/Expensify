import express from 'express';
import { google, login, logout, register } from '../controllers/authController.js';



const router = express.Router();

router.route('/signup').post(register);
router.route('/signin').post(login);
router.route('/logout').post(logout);
router.route('/google').post(google);
router

export default router;