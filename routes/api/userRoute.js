const router = require('express').Router();
//controllers for user
// GET all users (getUsers)
// GET single user (getSingleUser)
// POST new user (createUser)
// PUT to update user by id (updateUser)
// DELETE to remove user by id (deleteUser)

//BONUS: remove user's associated thoughts when deleted


// /api/users
router.route('/').get().post();

// /api/users/:userId (is it id or userId)
router.route('/:userId').get().put().delete();

// /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').post().delete();

module.exports = router;