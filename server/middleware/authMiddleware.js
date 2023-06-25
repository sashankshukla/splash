const { OAuth2Client } = require('google-auth-library');
const User = require('../models/userModel');

// Replace this with your Google client ID.
const GOOGLE_CLIENT_ID = '593968135288-s5uf8ttnu4uuk7b2k7uau15sl6v9gctm.apps.googleusercontent.com';
const client = new OAuth2Client(GOOGLE_CLIENT_ID);

async function validateGoogleToken(idToken) {
  const ticket = await client.verifyIdToken({
    idToken,
    audience: GOOGLE_CLIENT_ID,
  });
  const payload = ticket.getPayload();
  const email = payload['email'];
  return email;
}

async function authMiddleware(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).send('Not authorized');
  }
  try {
    const email = await validateGoogleToken(token);
    const user = await User.findOne({ email: email });
    if (!user) {
      res.status(400).send('User not found');
    }
    req.user = user;
    next();
  } catch (e) {
    console.error(e);
    return res.status(401).send('Not authorized');
  }
}

module.exports = authMiddleware;
