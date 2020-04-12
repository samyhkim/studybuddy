const mongoose = require("mongoose");

const problemSchema = mongoose.Schema({
  title: { type: String },
  prompt: { type: String },
  solution: { type: String },
  notes: { type: String },
  decks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Deck",
    },
  ],
});

module.exports = mongoose.model("Problem", problemSchema);
