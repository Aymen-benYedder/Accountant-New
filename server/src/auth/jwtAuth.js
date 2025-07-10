// JWT authentication middleware, CommonJS, JavaScript-only

const jwt = require('jsonwebtoken');

function jwtAuth(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Authorization header missing or invalid' });
    return;
  }
  const token = authHeader.slice(7);
  
  try {
    const secret = process.env.JWT_SECRET || 'default_secret';
    const decoded = jwt.verify(token, secret);
    // Patch: ensure req.user._id is always populated for compatibility
    req.user = decoded;
    if (!req.user._id && req.user.id) {
      req.user._id = req.user.id;
    }
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
}

module.exports = jwtAuth;