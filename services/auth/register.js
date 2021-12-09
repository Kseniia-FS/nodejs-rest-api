const HTTP409Error = require("../../helpers/errorHandlers/HTTP409Error");
const hash = require("../../helpers/hashing/hashPassword");
const gravatar = require("gravatar");
const User = require("../../models/users");

const register = async (email, password) => {
  const isEmailAlreadyExist = await User.findOne({ email: email });

  if (isEmailAlreadyExist) {
    throw new HTTP409Error("Email in use.");
  }

  const avatarURL = gravatar.url(email);

  const newUser = await User.create({
    email,
    password: hash(password),
    avatarURL,
  });
  return newUser;
};

module.exports = register;
