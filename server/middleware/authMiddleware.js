import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const verifyUser = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    console.log('TOKEN', req.cookies.token);

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Not Authenticated'
      })
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET)

    req.user = await User.findById(verified.id)

    if (!req.user) {
      return res.status(404).json({
        success: false,
        message: 'User not Found'
      })
    }
    next()
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token expired',
      });
    }

    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Invalid token',
      });
    }

    // General error handling
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
}