const { Thought, User } = require('../models');

module.exports = {
    // GET all thoughts
    getThoughts(req, res) {
        Thought.find()
          .then((thoughts) => res.json(thoughts))
          .catch((err) => res.status(500).jspm(err));
    },
    // GET a single thought
    getSingleThought(req, res) {
        Thought.findOnce({ _id: req.params.thoughtId })
          .then((thought) => 
          !thought
           ? res.status(404).json({ message: 'No thought with that ID '})
           : res.json(thought)
          )
          .catch((err) => res.status(500).json(err));
    },
    // POST to create new thought (push created thought's id to the associated user's thoughts array)
    createThought(req, res) {
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
              ? res.status(404).json({ messsage: 'Thought created, but found no user with that ID' })
              : res.json('Created the Thought 🎉')
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
    }

    // DELETE thought by id

    // POST to create reaction stored in single thought's reactions array

    // DELETE to pull and remove a reaction by reaction's reactionId value
}