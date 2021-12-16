const { HTTP404Error } = require("../../helpers/errorHandlers");
const User = require("../../models/users");

const getUserByQueryAndUpdate = async (prop, value) => {
  const user = await User.findOne({ [prop]: value });

  if (!user) {
    throw new HTTP404Error("Not Found");
  }

  if (prop === "verificationToken") {
    user.verify = true;
    user.verificationToken = null;
    user.save();
  }

  return user;
};

module.exports = getUserByQueryAndUpdate;
