const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
             //Must match a valid email address (look into Mongoose's matching validation)
             // is it supposed to be regex so like /.+\@.+\..+/
            match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, 'Please fill a valid email address']
        },
        thoughts: [
            {
                // array of _id values referencing the thought model
                type: Schema.Types.ObjectId,
                ref: 'thought',
            },
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'user'
            },
        ],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
);

// virtual friendCount that retrieves length of the user's friends array field
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

// initialize User model
const User = model('user', userSchema);

module.exports = User;