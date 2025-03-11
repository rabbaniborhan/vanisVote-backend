const mongoose = require("mongoose");

const pollSchema = new mongoose.Schema({
  question: String,
  type: {
    type: String,
    enum: ["multiple-choice", "yes-no"],
    default: "multiple-choice",
  },
  options: [{ text: String, votes: Number }],
  expiresAt: Date,
  resultsVisible: Boolean,
  likes: { type: Number, default: 0 },
  trending: { type: Number, default: 0 },
  comments: [
    {
      text: { type: String, default: "" },
      timestamp: { type: Date, default: Date.now },
    },
  ],
});

const Poll = mongoose.models.Poll || mongoose.model("Poll", pollSchema);

// Export the model
module.exports = Poll;
