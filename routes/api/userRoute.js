const router = require('express').Router();
//controllers for user
const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend,
} = require('../../controllers/userController')


// /api/users   (GET all users, POST new user)
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId (is it id or userId)   (GET single user, PUT user by id, DELETE user by id)
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

// /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);

module.exports = router;