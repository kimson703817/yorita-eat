# Yorita Eat

Web application for restaurant owners to expand their businesses on the web. Convenience, reviews, and data collection. Foodie networking. 

## Running Locally

```sh
npm install
npm install -g knex
knex init
knex migrate:latest
npm run dev
```

- Get consumer key/secret from Twitter Developer console.
- Create a Heroku postgres instance. Get Database URL.
- Create AWS S3 Bucket.
- Create AWS IAM User, get Access Key and Secret Access Key. Create a policy and give all permission to your User to the S3 Bucket.
- Create dev.js, use prod.js as a template for your config variables.
- If you wish to use NODE_ENV run `npm install dotenv` and import