const mongoose = require("mongoose");

const problemSchema = mongoose.Schema({
  title: { type: String },
  prompt: { type: String },
  solution: { type: String, default: false },
  notes: { type: String, default: false },
  progress: { type: Number, default: 0 },
  dueDate: { type: Number, default: 0 },
  decks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Deck",
    },
  ],
});

module.exports = mongoose.model("Problem", problemSchema);
