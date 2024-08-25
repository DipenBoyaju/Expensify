import jwt from "jsonwebtoken";

export const verifyUser = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(400).json({
      status: 'error',
      message: 'you need to login'
    })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);

    if (!decoded) {
      return res.status(400).json({
        status: 'error',
        message: 'token is invalid'
      })
    }

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(403).json({
      status: 'error',
      message: 'Invalid or expired token',
    });
  }
}