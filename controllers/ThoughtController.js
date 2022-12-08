const { Thought, User } = require('../models');

module.exports = {
    // GET all thoughts
    getThoughts(req, res) {
        Thought.find()
          .then((thoughts) => res.json(thoughts))
          .catch((err) => res.status(500).json(err));
    },
    // GET a single thought by ID
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
          .select('-__v')
          .then((thought) => 
          !thought
           ? res.status(404).json({ message: 'No thought with that ID '})
           : res.json(thought)
          )
          .catch((err) => res.status(500).json(err));
    },
    // POST to create new thought (push created thought's id to the associated user's thoughts array)
    createThought(req, res) {
        console.log('You are adding a thought')
        Thought.create(req.body)
          .then((thought) => {
            return User.findOneAndUpdate(
                { _id: req.body.userId },
                { $push: { thoughts: thought._id } },
                { new: true }
            );
          })
          .then((user) =>
            !user
              ? res.status(404).json({ messsage: 'No user with this ID' })
              : res.json(user)
          )
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
    },
    // PUT to update thought by id
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
        .then((thought) =>
          !thought
          ? res.status(404).json({ messsage: 'No thought with this ID' })
          : res.json(thought)
          )
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
    },

    // DELETE thought by id
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
          .then((thought) => 
            !thought
              ? res.status(404).json({ message: 'No thought with this ID' })
              : User.findOneAndUpdate(
                { thoughts: req.params.thoughtId },
                { $pull: { thoughts: req.params.thoughtId } },
                { new: true }
              )
          )
          . then((thought) =>
          !thought
            ? res.status(404).json({ message: 'Thought deleted, but no user with this ID'})
            : res.json({ message: 'Thought successfully deleted'})
          )
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
    },

    // POST to create reaction stored in single thought's reactions array
    createReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.params.body } },
            { runValidators: true, new: true }
        )
        .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with this ID'})
          : res.json(thought)
        )
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    // DELETE to pull and remove a reaction by reaction's reactionId value
    deleteReaction(req, res) {
        Thought.findOneAndUpdate (
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reationId: req.params.reactionId } }},
            { runValidators: true, new: true }
        )
        .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought found with this ID'})
          : res.json(thought)
        )
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },
};