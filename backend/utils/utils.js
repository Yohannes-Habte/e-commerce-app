import jwt from 'jsonwebtoken';

//=====================================================================
// Function that generate a token for the user
//=====================================================================
export const generateToken = (user) => {
  try {
    const userToken = jwt.sign(
        {
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
        },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
      return userToken;
  } catch (err) {
    console.log(err);
  }
};
