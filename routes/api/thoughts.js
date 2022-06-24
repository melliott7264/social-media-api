const router = require('express').Router();

const {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction,
} = require('../../controllers/thoughts');

// Setup GET all and POST at /api/thoughts
router.route('/').get(getAllThoughts).post(createThought);

// Setup GET one, PUT, and Delete at /api/thoughts/:thoughtId
router.route('/:thoughtId').get(getThoughtById).put(updateThought);

// Setup Delete at /api/thoughts/:thoughtId
router.route('/:thoughtId').delete(deleteThought);

// Setup POST at /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(createReaction);

// Setup DELETE at /api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;
