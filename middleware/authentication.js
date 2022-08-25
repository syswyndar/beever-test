const { convertToken } = require("../helpers/jwt");
const { User } = require("../models/index");

const userAuthentication = async (req, res, next) => {
  try {
    // check bearer token in req header
    if (!req.headers.authorization) throw { name: "anauthenticated" };
    const access_token = req.headers.authorization.split(" ")[1];
    if (!access_token) throw { name: "anauthenticated" };

    const payload = convertToken(access_token);
    const user = await User.findOne({
      where: {
        id: payload.id,
        email: payload.email,
      },
    });
    if (!user) {
      throw { name: "anauthenticated" };
    }

    req.user = {
      id: user.id,
      email: user.email,
    };
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = { userAuthentication };
