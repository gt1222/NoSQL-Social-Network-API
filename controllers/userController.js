const { User, Thought } = require('../models');

module.exports = {
// GET all users
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },

// GET single user by ID
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
    .select('-__v')
    .then((user) =>
    !user
      ? res.status(404).json({ message: 'No use with that ID'})
      : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

// POST a new user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

// PUT update user by its ID
updateUser(req, res) {
    User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true}
    )
    .then((user) => 
      !user
        ? res.status(404).json({ message: 'No user with this ID' })
        : res.json(user)
    )
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
},

// DELETE to remove user by its ID
deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) =>
      // BONUS: REMOVE user's associated thoughts when deleted
        !user
          ? res.status(404).json ({ message: 'No user with this ID' })
          : Thought.deleteMany({ _id: { $in: user.thoughts } })
      )
      .then(() => res.json({ message: 'User and associated thoughts deleted' }))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
},

// POST add new friend to a user's friend list
addFriend(req, res) {
 console.log('You are adding a new friend')
 User.findOneAndUpdate(
    { _id: req.params.userId },
    // is it req.body or friend._id
    { $addToSet: { friends: req.params.friendId } },
    { runValidators: true, new: true }
 )
 .then((user) =>
   !user
     ? res.status(404).json({ message: 'No user found with this ID' })
     : res.json(user)
 )
 .catch((err) => {
    console.log(err);
    res.status(500).json(err);
 });
},

// DELETE to remove friend from user's friend list
deleteFriend(req, res) {
  User.findOneAndUpdate(
    {  _id: req.params.userId },
    { $pull: { friends: req.params.friendId } },
    { runValidators: true, new: true }
  )
  .then((user) => 
    !user
      ? res.status(404).json({ message: 'No user with this ID' })
      : res.json(user)
  )
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
},
};
