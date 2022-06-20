const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
  },
  thoughts: [],
  friends: [],
});

const User = model('User', UserSchema);

module.exports = User;
