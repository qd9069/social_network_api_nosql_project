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
function formatTime (unixTimestamp) {
    // if (!unixTimestamp) return unixTimestamp;
    const date = new Date(unixTimestamp*1000);
    return (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
};

module.exports = reactionSchema;
