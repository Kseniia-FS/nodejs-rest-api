const { HTTP400Error } = require("../../helpers/errorHandlers");
const User = require("../../models/users");

const getUserByEmail = async (email, prop, value) => {
  const user = await User.findOne({ email, [prop]: value });
  if (user[prop] === true) {
    throw new HTTP400Error("Verification has already been passed");
  }

  return user;
};

module.exports = getUserByEmail;
