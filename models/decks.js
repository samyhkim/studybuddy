const mongoose = require("mongoose");

const deckSchema = mongoose.Schema({
  title: { type: String },
  description: { type: String },
  problems: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Problem",
    },
  ],
});

module.exports = mongoose.model("Deck", deckSchema);
