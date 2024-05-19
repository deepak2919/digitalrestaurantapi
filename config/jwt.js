const jwt = require('jsonwebtoken');

const generateToken = (payload) => {
  return jwt.sign(payload, 'secretkey');
};

const verifyToken = (req,res,next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token.split(' ')[1], 'secretkey');
    // Attach the decoded payload to the request object for future use
    req.user = decoded;
    // Call the next middleware or route handler
    next();
  } catch (error) {
    // Token is invalid or expired
    return res.status(403).json({ msg: 'Invalid token',success:false });
  }
};


const getManagerTokenDecoded = (req) => {
  const token = req.headers.authorization;
  const decoded = jwt.verify(token.split(' ')[1], 'secretkey');
  return decoded;
};


module.exports = { generateToken, verifyToken,getManagerTokenDecoded };
