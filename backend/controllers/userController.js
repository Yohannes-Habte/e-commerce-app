import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/utils.js';

//=====================================================================
// Signin User
//=====================================================================
export const createUser = async (req, res, next) => {
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
