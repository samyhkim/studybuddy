const mongoose = require("mongoose");

const deckSchema = mongoose.Schema({
  title: { type: String },
  description: { type: String },
});

module.exports = mongoose.model("Deck", deckSchema);
