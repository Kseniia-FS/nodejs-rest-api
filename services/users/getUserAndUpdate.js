const { HTTP401Error } = require("../../helpers/errorHandlers");
const User = require("../../models/users");

const getUserAndUpdate = async (id, prop, value) => {
  const user = await User.findByIdAndUpdate(
    id,
    { [prop]: value },
    { new: true }
  );
  if (!user) {
    throw new HTTP401Error("Not authorized");
  }

  return user;
};

module.exports = getUserAndUpdate;
