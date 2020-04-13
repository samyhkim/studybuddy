const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
  deck: { type: mongoose.Schema.Types.ObjectId },
  problem: { type: mongoose.Schema.Types.ObjectId },
  dueDate: { type: Number },
});

reviewSchema.index({ deck: 1, dueDate: 1 });

module.exports = mongoose.model("Review", reviewSchema);
