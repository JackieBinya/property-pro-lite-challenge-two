import jwt from 'jsonwebtoken';
import models from '../models';

const verifyNewUser = (req, res, next) => {
  const { email } = req.body;

  const result = models.User.findByEmail(email);
  if (result) {
    return res.status(400).json({
      status: 'error',
      msg: 'Your email is already registered in the app, you are only allowed to have one account.',
    });
  }
  next();
};

const verifyExistingUser = (req, res, next) => {
  const { email } = req.body;

  const result = models.User.findByEmail(email);
  if (!result) {
    return res.status(400).json({
      status: 'error',
      msg: 'Please sign up to continue, if already signed up email you provided is incorrect. Please try again.',
    });
  }
  next();
};

const verifyAuthUser = (req, res, next) => {
  // Note how you grab token from req.header();
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({
      status: 'error',
      msg: 'No token access denied',
    });
  }

  jwt.verify(token, process.env.JWT_PRIVATE_KEY, (err, decoded) => {
    if (err) {
      return res.status(400).json({
        status: 'error',
        msg: 'No authorisation, token invalid!',
      });
    }
    req.decoded = decoded;
    next();
  });
};

const verifyExistingProperty = (req, res, next) => {
  const { propertyId } = req.params;
  const result = models.Property.findOne(propertyId);
  if (!result) {
    return res.status(400).json({
      status: 'error',
      msg: 'Property does not exist!',
    });
  }
  next();
};

const verifyPropertyBelongsToUser = (req, res, next) => {
  const id = req.decoded.payload;
  const { propertyId } = req.params;
  const result = models.Property.findOne(propertyId);
  if (result.owner !== id ) {
    return res.status(400).json({
      status: 'error',
      msg: 'Access denied! ',
    });
  }
  next();
};

export {
  verifyNewUser,
  verifyExistingUser,
  verifyAuthUser,
  verifyExistingProperty,
  verifyPropertyBelongsToUser,
};
