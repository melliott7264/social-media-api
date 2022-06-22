const router = require('express').Router();

const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  createFriend,
  deleteFriend,
} = require('../../controllers/users');

// Setup GET all and POST at /api/users
router.route('/').get(getAllUsers).post(createUser);

// Setup GET one, PUT, and Delete at /api/users/:userId
router.route('/:userId').get(getUserById).put(updateUser).delete(deleteUser);

// Setup POST at /api/users/:userId/friends
router.route('/:userId/friends').post(createFriend);

// Setup Delete at /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').delete(deleteFriend);

module.exports = router;
