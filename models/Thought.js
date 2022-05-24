const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

// Schema to create Thought model
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },
        createdAt: {
            type: Date,
            // `Date.now()` returns the current unix timestamp as a number
            default: Date.now,
            get: formatTime,
        },
        // The user that created this thought
        username: {
            type: String,
            required: true,
        },
        // These are like replies - Array of nested documents created with the "reactionSchema"
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
);

// Create a virtual called "reactionCount" that retrieves the length of the thought's reactions array field on query
thoughtSchema
    .virtual('reactionCount')
    .get(function totalReactions () {
        return this.reactions.length;
    });

// function to format the unix timestamp
function formatTime (date) {
    // console.log(date);
    return date.toLocaleString();
};

// Initialize our Thought model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;
