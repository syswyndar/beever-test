const { User } = require("../models");
const { decryptPassword } = require("../helpers/bcrypt");
const { getToken } = require("../helpers/jwt");

const Register = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // validation req body
    if (!email || !password) {
      throw { name: "email or password required" };
    }

    const newUser = await User.create({ email, password });
    const result = {
      id: newUser.id,
      email: newUser.email,
    };
    res.status(201).json({
      success: true,
      message: `User ${email} created successfully`,
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // validation req body
    if (!email || !password) {
      throw { name: "email or password required" };
    }

    // find user in database
    const user = await User.findOne({ email });

    if (!user) throw { name: "invalid email or password" };

    // check password
    const isValidPassword = decryptPassword(password, user.password);
    if (!isValidPassword) throw { name: "invalid email or password" };

    let token = getToken({
      id: user.id,
      email: user.email,
    });

    res.status(200).json({
      success: true,
      message: "login success",
      data: {
        token,
      },
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = {
  Register,
  Login,
};
