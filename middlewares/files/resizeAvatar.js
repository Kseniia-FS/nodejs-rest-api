const Jimp = require("jimp");

const resizeAvatar = (req, res, next) => {
  const { path, originalname } = req.file;

  Jimp.read(path)
    .then((avatar) => {
      avatar.resize(250, 250);
      console.log(`Avatar :${originalname} has been resized`);
      next();
    })
    .catch((err) => next(err));
};

module.exports = resizeAvatar;
