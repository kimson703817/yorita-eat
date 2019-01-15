const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  twitterId: String
});

mongoose.model('users', userSchema);
