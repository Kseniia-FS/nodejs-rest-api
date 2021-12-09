const upload = require("./multer");
const resizeAvatar = require("./resizeAvatar");
const uploadFileToGoogleStorage = require("./google-storage");

module.exports = { upload, resizeAvatar, uploadFileToGoogleStorage };
