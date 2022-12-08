const { Schema, model } = require('mongoose');
// reaction is a subdoc in Thought model
const reactionSchema = require('./Reaction');
const dayjs = require('dayjs');

//Schema to create Thought model
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            maxlength: 280,
            minlength: 1,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            //getter method to format timestamp query, lol need to figure out how to format date
            get: (timestamp) => dayjs(timestamp).format('MMM Do, YYYY [at] h:mm a')
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            getters: true,
            virtuals: true,
        },
    }
);

// virtual that retrieves length of the thought's reactions array field
thoughtSchema.virtual('reactionCount').get(function () {
    // do i need to do anything else to get the length(?)
    return this.reactions.length;
});

// initialize Thought model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;

