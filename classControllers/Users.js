const fs = require("fs/promises");
const path = require("path");
const { HTTP400Error } = require("../helpers/errorHandlers");
const { uploadFileToGoogleStorage } = require("../middlewares/files");
const { sendEmail } = require("../services/auth");

const {
  getCurrentUser,
  editSubscription,
  getUserAndUpdate,
  getUserByQueryAndUpdate,
  getUserByEmail,
} = require("../services/users");

const newFilePath =
  "/home/subozero/Documents/GitHub/nodejs-rest-api/public/avatars";

class Users {
  async verification(req, res) {
    const { verificationToken } = req.params;
    const user = await getUserByQueryAndUpdate(
      "verificationToken",
      verificationToken
    );

    res.json({
      message: "Verification successful",
      data: { email: user.email, subscription: user.subscription },
    });
  }

  async verificationRepeat(req, res) {
    const { email } = req.body;
    if (!email) {
      throw HTTP400Error("missing required field email");
    }

    const user = await getUserByEmail(email, "verify", false);

    const message = {
      to: email,
      subject: "Please verify your email",
      html: `Please <a href="http://localhost:5050/api/users/verify/${user.verificationToken}">clik here</a> to verify your email`,
    };

    await sendEmail(message);

    res.status(200).json({ message: "Verification email sent" });
  }

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
