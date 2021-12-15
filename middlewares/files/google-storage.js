const { Storage } = require("@google-cloud/storage");
const storage = new Storage();
const bucketName = "tutorial_node";

async function uploadFileToGoogleStorage(filePath, destFileName) {
  await storage.bucket(bucketName).upload(filePath, {
    destination: destFileName,
  });

  console.log(`${filePath} uploaded to ${bucketName}`);
}

module.exports = uploadFileToGoogleStorage;
