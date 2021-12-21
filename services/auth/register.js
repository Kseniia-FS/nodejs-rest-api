const gravatar = require("gravatar");
const { v4: uuidv4 } = require("uuid");
const hash = require("../../helpers/hashing/hashPassword");
const HTTP409Error = require("../../helpers/errorHandlers/HTTP409Error");
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
    verificationToken: uuidv4(),
  });
  return newUser;
};

module.exports = register;
