const { Thought } = require('../models');

const thoughtController = {
  // getallThoughts /api/thoughts
  getAllThoughts(req, res) {
    Thought.find({})
      .populate({
        path: 'reactions',
        select: '-__v',
      })
      .select('-__v')
      .sort({ _id: -1 })
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // getThoughtById /api/thoughts/:thoughtId
  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.thoughtId })
      .populate({
        path: 'reactions',
        select: '-__v',
      })
      .select('-__v')
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No Thought with that id found!' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // createThought  /api/thoughts/
  createThought({ params, body }, res) {
    Thought.create(body)
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // updateThought  /api/thoughts/:thoughtId
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.thoughtId }, body, { new: true })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No Thought with that id found!' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // deleteThought  /api/thoughts/:thoughtId
  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.thoughtId })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No Thought with that id found!' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // createReaction  /api/thoughts/:thoughtId/reactions
  createReaction({ params, body }, res) {
    Thought.create(body)
      .then(({ _id }) => {
        return Thought.findOneAndUpdate(
          { _id: params.thoughtId },
          { $push: { reactions: _id } },
          { new: true }
        );
      })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No Thought with that id found!' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // deleteReaction  /api/thoughts/:thoughtId/reactions/:reactionId
  deleteReaction({ params }, res) {
    Thought.findOneAndDelete({ _id: params.reactionId })
      .then((deletedReaction) => {
        if (!deletedReaction) {
          return res
            .status(404)
            .json({ message: ' No reaction with that id found!' });
        }
        return Thought.findOneAndUpdate(
          { _id: params.thoughtId },
          { $pull: { reactions: params.reactionId } },
          { new: true }
        );
      })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No Thought with that id found!' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
};

module.exports = thoughtController;
