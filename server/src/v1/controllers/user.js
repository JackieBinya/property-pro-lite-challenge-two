import bcrypt from 'bcryptjs';
import models from '../models';
import generateToken from '../utils/authService';

const createNewUser = (req, res) => {
  const {
    firstName, lastName, email, password,
  } = req.body;

  // Trim input
  firstName.trim();
  lastName.trim();
  email.trim();
  password.trim();

  // salt and hash
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  const user = models.User
    .create({
      firstName,
      lastName,
      email,
      password: hash,
    });

  const token = generateToken(user.id);
  res.status(201).json({
    status: 'success',
    data: {
      token,
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        id: user.id,
      },
    },
  });
};

const authUser = (req, res) => {
  const { email, password } = req.body;

  // Trim input
  email.trim();
  password.trim();
  
  const user = models.User.findByEmail(email);

  bcrypt.compare(password, user.password, (err, isMatch) => {
    // res === true
    if (err) throw err;

    if (isMatch) {
      const token = generateToken(user.id);
      return res.status(200).json({
        status: 'success',
        data: {
          token,
          user: {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
          },
        },
      });
    }

    if (!isMatch) {
      return res.status(400).json({
        status: 'error',
        msg: 'Authentification failed incorrect password!',
      });
    }
  });
};


export { createNewUser, authUser };
