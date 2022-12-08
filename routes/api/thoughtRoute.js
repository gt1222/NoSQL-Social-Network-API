const router = require('express').Router();
//controllers for thought
const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction,
} = require('../../controllers/ThoughtController');


// /api/thoughts   (GET all thoughts, POST new thoughts)
router.route('/').get(getThoughts).post(createThought);

// /api/thoughts/:thoughtId(id or thoughtsId does it matter)  (GET single thought, PUT thought by id, DELETE thought by id)
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);

// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(createReaction);

// /api/thoughts/:thoughtId/reactions/:reactionId  (DELETE reaction by Id)
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction)

module.exports = router;