import jwt from 'jsonwebtoken';

const sendToken = (user, statusCode, res, message) => {
  // Create JWT Token
  const jwtToken = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );

  // Cookie options
  const options = {
    expires: new Date(
      Date.now() + (Number(process.env.COOKIE_EXPIRES_TIME) || 7) * 24 * 60 * 60 * 1000
    ),
    httpOnly: true, // Prevents XSS attacks
  };

  return res.status(statusCode).cookie('token', jwtToken, options).json({
    success: true,
    message,
    token: jwtToken,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
};

export default sendToken;
