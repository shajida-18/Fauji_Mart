const jwt = require('jsonwebtoken');
const SECRET = 'faujimart_secret';

function verifyToken(req, res, next) {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ message: 'Missing token' });
  const token = header.split(' ')[1];

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = decoded;
    next();
  });
}

module.exports = verifyToken;
