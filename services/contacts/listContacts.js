const Contact = require("../../models/contacts");
const listContacts = async () => {
  const result = await Contact.find().populate("owner", "email");

  return result;
};

module.exports = listContacts;
