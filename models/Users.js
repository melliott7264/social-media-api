const { Schema, model } = require('mongoose');

const { Thought } = require('./Thoughts');

const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: 'Username is required!',
      trim: true,
    },
    email: {
      type: String,
      required: 'E-mail is required!',
      unique: true,
      match: [/^([a-z0-9_\-\.]+)\@([\da-z\.\-]+)\.([a-z\.]{2,6})$/],
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought',
      },
    ],
    friends: [this],
  },
  {
    toJSON: {
      virutals: true,
    },
  }
);

UserSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

const User = model('User', UserSchema);

module.exports = User;
