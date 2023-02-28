import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import createError from 'http-errors';
import { generateToken } from '../utils/utils.js';

//=====================================================================
// Signup User
//=====================================================================
export const signupUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    const findUser = await User.findOne({ email: req.body.email });
    if (findUser) {
      return next(
        createError(401, 'Email has been already taken. Please try again!')
      );
    }

    if (!findUser) {
      const newUser = new User({
        name: name,
        email: email,
        password: bcrypt.hashSync(password),
      });

      const user = await newUser.save();

      return res.status(201).send({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user),
      });
    }
  } catch (error) {
    return next(createError(404, 'User could not signup. Please try again!'));
  }
};

//=====================================================================
// Signin User
//=====================================================================
export const signinUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      // Check password
      const isPasswordValid = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!isPasswordValid) {
        return next(createError(400, 'Invalid password. Please try again!'));
      }

      // If user exist and password is valid, then the response will be:
      if (user && isPasswordValid) {
        return res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user),
        });
      } else {
        res.status(400);
        throw new Error('Invalide Email or password');
      }
    }
  } catch (error) {
    console.log(error);
    return next(createError(400, 'User could not login. Please try again!'));
  }
};
