module.exports = {
  cookieKey: process.env.COOKIE_KEY,
  twitter: {
    consumerKey: process.env.TWITTER_CK,
    consumerSecret: process.env.TWITTER_SK,
    callbackURL: process.env.TWITTER_CALLBACK
  },
  pgURI: process.env.DATABASE_URL,
  clientURI: 'https://yorita-eat.herokuapp.com',
  IAM: {
    accessKeyId: process.env.IAM_ACCESS_KEY,
    secretAccessKey: process.env.IAM_SECRET_KEY
  },
  S3: {
    Bucket: process.env.S3_BUCKET_NAME
  },
  storageServiceProvider: process.env.STORAGE_SERVICE_PROVIDER,
  placeholderImages: {
    restaurantIcon: process.env.PLACEHOLDER_RESTAURANT_ICON
  }
};
