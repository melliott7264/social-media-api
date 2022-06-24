const { User, Thought } = require('../models');

const userController = {
  // getAllUsers  /api/users/
  getAllUsers(req, res) {
    User.find({})
      .populate({
        path: 'friends',
        select: '-__v',
      })
      .populate({
        path: 'thoughts',
        select: '-__v',
      })
      .select('-__v')
      .sort({ _id: -1 })
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // getUserById  /api/users/:userId
  getUserById({ params }, res) {
    User.findOne({ _id: params.userId })
      .populate({
        path: 'friends',
        select: '-__v',
      })
      .populate({
        path: 'thoughts',
        select: '-__v',
      })
      .select('-__v')
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: 'User with that id was not found!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // createUser   /api/users
  createUser({ body }, res) {
    User.create(body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // updateUser   /api/users/:userId
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.userId }, body, { new: true })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: 'User with that id was not found!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // deleteUser  /api/users/:userId
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.userId })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: 'User with that id was not found!' });
          return;
        }
        // Removing the thoughts associated with a username
        for (let i = 0; i < dbUserData.thoughts.length; i++) {
          Thought.findOneAndDelete({ _id: dbUserData.thoughts[i] }).then(
            (dbThoughtData) => {
              if (!dbThoughtData) {
                res
                  .status(404)
                  .json({ message: 'No Thought with that id found!' });
                return;
              }
            }
          );
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // createFriend  add a friend to user /api/users/:userId/friends
  createFriend({ params, body }, res) {
    User.create(body)
      .then(({ _id }) => {
        User.findOneAndUpdate(
          { _id: params.userId },
          { $push: { friends: _id } },
          { new: true }
        ).then((dbUserData) => {
          if (!dbUserData) {
            res
              .status(404)
              .json({ message: 'User with that id was not found!' });
            return;
          }
          res.json(dbUserData);
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // deleteFriend  /api/users/:userId/friends/:friendsId
  deleteFriend({ params }, res) {
    User.findOneAndDelete({ _id: params.friendId })
      .then((deletedFriend) => {
        if (!deletedFriend) {
          res.status(404).json({ message: 'No friend found with that id!' });
          return;
        }
        User.findOneAndUpdate(
          { _id: params.userId },
          { $pull: { friends: params.friendId } },
          { new: true }
        ).then((dbUserData) => {
          if (!dbUserData) {
            res.status(404).json({ message: 'No user with that id found!' });
            return;
          }
          res.json(dbUserData);
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
};

module.exports = userController;
