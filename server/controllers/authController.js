import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/User.js';

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !password || !email) {
    return res.status(500).json({
      status: 'error',
      message: 'All fields are required'
    })
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        status: 'error',
        message: 'User already exists'
      });
    }

    const hashedPassword = await bcrypt.hashSync(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    })

    await newUser.save();

    res.status(201).json({
      status: 'success',
      message: 'User Registered Successfully'
    })
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
}

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      status: 'error',
      message: 'All fields are required'
    })
  }

  try {
    const validUser = await User.findOne({ email });

    if (!validUser) {
      return res.status(400).json({
        status: 'error',
        message: 'User does not exist'
      });
    }

    const validPassword = await bcrypt.compare(password, validUser.password);

    if (!validPassword) {
      return res.status(400).json({
        status: 'error',
        message: 'Incorrect password'
      });
    }

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    const { password: hashedPassword, ...userData } = validUser._doc;

    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'Strict',
      maxAge: 3600000,
    })

    return res.status(200).json({
      status: 'success',
      message: 'Login Successful',
      user: userData,
    })

  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
}

export const logout = (req, res) => {
  res.clearCookie('token', { httpOnly: true, });
  res.status(200).json({
    status: 'success',
    message: 'Successfully Logged Out'
  })
}

export const google = async (req, res) => {
  const { username, email } = req.body;
  try {
    if (!email || !username) {
      return res.status(400).json({
        status: 'error',
        message: 'Name and email are required'
      });
    }
    const user = await User.findOne({ email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });
      const { password, ...userData } = user._doc;

      res.cookie('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'Strict',
        maxAge: 3600000,
      })

      return res.status(200).json({
        status: 'success',
        message: 'Login Successful',
        user: userData,
      })
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcrypt.hashSync(generatedPassword, 10);
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });
      const { password, ...userData } = newUser._doc;
      res.cookie('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'Strict',
        maxAge: 3600000,
      })

      return res.status(200).json({
        status: 'success',
        message: 'Signup Successful',
        user: userData,
      })
    }
  } catch (error) {
    console.error('Error in Google auth:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
}; 