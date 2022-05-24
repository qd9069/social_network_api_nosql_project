const { Schema, Types } = require('mongoose');

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
    // The user that created this reaction
    username: {
        type: String,
        required: true,
    },
    createdAt: {
      type: Date,
      // `Date.now()` returns the current unix timestamp as a number 
      default: Date.now,
      get: formatTime,
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

// function to format the unix timestamp
function formatTime (date) {
    // console.log(date);
    return date.toLocaleString();
};

module.exports = reactionSchema;
