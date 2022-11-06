const router = require('express').Router();
//controllers for thought


// /api/thoughts   (GET all thoughts, POST new thoughts)
router.route('/').get().post();


// /api/thoughts/:thoughtId(id or thoughtsId does it matter)  (GET single thought, PUT thought by id, DELETE thought by id)
router.route('/:thoughtId').get().put().delete();

// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post();

// /api/thoughts/:thoughtId/reactions/:reactionId  (DELETE reaction by Id)
router.route('/:thoughtId/reactions/:reactionId').delete()

module.exports = router;