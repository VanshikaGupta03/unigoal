const AWS = require("aws-sdk");
const { warningResponse, successMessageResponse } = require("../helpers/response");

AWS.config.update({
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
});

// Specify your AWS S3 region
const s3 = new AWS.S3({ region: process.env.S3_REGION });

exports.deleteAwsS3Url = (oldS3Url, callback) => {
  try {
    let Key = getKeyFromS3Url(oldS3Url);
    const params = {
      Bucket: process.env.S3_BUCKET,
      Key,
    };
    s3.deleteObject(params, (err, data) => {
      if (err) {
        console.error("Error deleting the S3 bucket url:", err);
        callback(err, null);
      } else {
        console.log("deleted S3 bucket url successfully");
        callback(null, data);
      }
    });
  } catch (err) {
    console.error("Error deleting the S3 bucket url:", err);
    callback(err, null);
  }
};

function getKeyFromS3Url(oldS3Url) {
  // Split the URL by '/'
  const parts = oldS3Url.split("/");
  // The key is the last part of the URL
  const key = parts[parts.length - 1];
  return key;
}
