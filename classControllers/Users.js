const fs = require("fs/promises");
const path = require("path");
const { uploadFileToGoogleStorage } = require("../middlewares/files");

const {
  getCurrentUser,
  editSubscription,
  getUserAndUpdate,
} = require("../services/users");

const newFilePath =
  "/home/subozero/Documents/GitHub/nodejs-rest-api/public/avatars";

class Users {
  async getUser(req, res) {
    const { id } = req.user;

    const user = await getCurrentUser(id);
    res.json({
      status: "success",
      data: { email: user.email, subscription: user.subscription },
    });
  }

  async changeSubscription(req, res) {
    const { subscription } = req.body;
    const { _id } = req.user;

    const user = await editSubscription(_id, subscription);
    res.json({
      status: "success",
      data: { email: user.email, subscription: user.subscription },
    });
  }

  async changeAvatar(req, res) {
    const { _id } = req.user;
    const { path: filePath, originalname } = req.file;
    const avatarName = `${_id}_${originalname}`; //rename file
    const resultPath = path.join(newFilePath, avatarName); // local storage of files

    try {
      await fs.rename(filePath, resultPath); //remove to local storage (public/avatars)
      const imagePath = path.join("public", "avatars", avatarName);
      const user = await getUserAndUpdate(_id, "avatarURL", imagePath); // change of avatarURL in mongoDB
      await uploadFileToGoogleStorage(resultPath, avatarName); //upload file to google storage

      res.json({ status: "success", data: user.avatarURL });
    } catch (error) {
      await fs.unlink(filePath);
    }
  }
}

module.exports = Users;
