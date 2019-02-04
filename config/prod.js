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
    iamAccessKeyId: process.env.IAM_ACCESS_KEY,
    iamSecretAccessKey: process.env.IAM_SECRET_KEY
  }
};
