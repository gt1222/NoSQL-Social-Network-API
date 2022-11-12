//schema only used as subdocument schema in Thought model
const { Schema, Types } = require('mongoose');
const dayjs = require('dayjs');

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            // default value to current timestamp
            default: Date.now,
            //getter method to format timestamp query, lol need to figure out how to format date
            get: (timestamp) => dayjs(timestamp).format()

        }
    },
    { // look up toJSON part and what this area means
        toJSON: {
            getters: true,
        },
        id: false,
    }
);

module.exports = reactionSchema;
    