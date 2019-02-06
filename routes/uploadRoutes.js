const AWS = require('aws-sdk');
const keys = require('../config/keys');
const requireLogin = require('../middlewares/requireLogin');
const router = require('express').Router();
const uuid = require('uuid/v4');

const s3 = new AWS.S3({
  accessKeyId: keys.IAM.accessKeyId,
  secretAccessKey: keys.IAM.secretAccessKey
});

router.get('/', requireLogin, (req, res) => {
  const key = `${req.user.id}/${uuid()}.jpeg`;
  s3.getSignedUrl(
    'putObject',
    {
      Bucket: keys.S3.Bucket,
      Key: key,
      ContentType: 'jpeg'
    },
    (err, url) => res.send({ key, url })
  );
});

module.exports = router;
