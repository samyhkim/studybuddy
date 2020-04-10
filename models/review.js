const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
  deck: { type: Integer },
  dueDate: { type: Integer },
  problem: { type: Integer },
});

module.exports = mongoose.model("Review", reviewSchema);
