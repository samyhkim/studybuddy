const mongoose = require("mongoose");
const Problem = require("../models/problems");

const dbConnect = () => {
  mongoose.Promise = global.Promise;
  mongoose
    .connect("mongodb://localhost:27017/sb-cli", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .catch((err) => console.log(err));
};

// CREATE
const create = async (body) => {
  dbConnect();
  const mongo_promise = await Problem.create(body);
  mongoose.connection.close();
  return mongo_promise;
};

// READ
const list = async () => {
  dbConnect();
  const mongo_promise = await Problem.find();
  const problems = [];
  mongoose.connection.close();
  mongo_promise.forEach((problem) => {
    problems.push(problem.title);
  });
  return problems;
};

const retrieve = async (title) => {
  dbConnect();
  const mongo_promise = await Problem.findOne({ title: title });
  mongoose.connection.close();
  return mongo_promise;
};

const getRandom = async () => {
  dbConnect();
  const mongo_promise = await Problem.aggregate([{ $sample: { size: 1 } }]);
  mongoose.connection.close();
  return mongo_promise;
};

// DELETE
const destroy = async (title) => {
  dbConnect();
  const mongo_promise = await Problem.deleteOne({ title: title });
  mongoose.connection.close();
  return mongo_promise;
};

module.exports = { dbConnect, create, list, retrieve, getRandom, destroy };
