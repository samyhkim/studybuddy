const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
  deck: { type: mongoose.Schema.Types.ObjectId },
  problem: { type: mongoose.Schema.Types.ObjectId },
  dueDate: { type: Integer },
});

module.exports = mongoose.model("Review", reviewSchema);
