const AWS = require('aws-sdk');
const keys = require('../config/keys');

const s3 = new AWS.S3({
  accessKeyId: keys.IAM.accessKeyId,
  secretAccessKey: keys.IAM.secretAccessKey
});

const deleteResourceObject = (req, res, next) => {
  const { s3_bucketKey } = req.body;
  if (s3_bucketKey) {
    s3.deleteObject(
      {
        Bucket: keys.S3.Bucket,
        Key: s3_bucketKey
      },
      (err, url) => {
        if (err) {
          console.log(err);
        }
      }
    );
  }

  next();
};

module.exports = {
  deleteResourceObject
};
