const mongoose = require("mongoose");

const problemSchema = mongoose.Schema({
  title: { type: String },
  prompt: { type: String },
});

module.exports = mongoose.model("Problem", problemSchema);
