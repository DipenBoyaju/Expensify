import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const verifyUser = async (req, res, next) => {
  try {
    const token = req.cookies.access_token;
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
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
}