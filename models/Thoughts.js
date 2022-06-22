const { Schema, model, Types } = require('mongoose');
const dayjs = require('dayjs');

const ReactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: 'The reaction text is required.',
      maxlength: 280,
    },
    username: {
      type: String,
      required: 'A username is required.',
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dayjs(createdAtVal).format('MMM/DD/YYYY hh:mma'),
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: 'Thought text is required',
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dayjs(createdAtVal).format('MMM/DD/YYYY hh:mma'),
    },
    username: {
      type: String,
      required: 'Must have a username',
    },
    reactions: [ReactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
  }
);

ThoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;
