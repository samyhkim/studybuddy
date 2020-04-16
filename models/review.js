const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
  deckId: { type: mongoose.Schema.Types.ObjectId },
  problemId: { type: mongoose.Schema.Types.ObjectId },
  dueDate: { type: Number },
});

reviewSchema.index({ deck: 1, dueDate: 1 });

module.exports = mongoose.model("Review", reviewSchema);
