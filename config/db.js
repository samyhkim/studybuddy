const mongoose = require("mongoose");
const Problem = require("../models/problems");
const Deck = require("../models/decks");

const dbConnect = async () => {
  mongoose.Promise = global.Promise;
  await mongoose
    .connect("mongodb://localhost:27017/sb-cli", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Successfully connected to MongoDB."))
    .catch((err) => console.error("Connection error", err));
};

const dbClose = async () => {
  await mongoose.connection
    .close()
    .then(() => console.log("Successfully disconnected from MongoDB."))
    .catch((err) => console.error("Connection error", err));
};

// CREATE
const create = async (body, type) => {
  await dbConnect();
  let mongo_promise = null;
  if (type == "Deck") {
    mongo_promise = await Deck.create(body);
  } else if (type == "Problem") {
    mongo_promise = await Problem.create(body);
  }
  await dbClose();
  return mongo_promise;
};

const addProblemToDeck = async (deckId, problemId) => {
  await dbConnect();
  const mongo_promise = await Deck.findByIdAndUpdate(
    deckId,
    {
      $push: {
        problems: problemId,
      },
    },
    {
      new: true,
      useFindAndModify: false,
    }
  );
  await dbClose();
  return mongo_promise;
};

const addDeckToProblem = async (problemId, deckId) => {
  await dbConnect();
  const mongo_promise = await Problem.findByIdAndUpdate(
    problemId,
    {
      $push: {
        decks: deckId,
      },
    },
    {
      new: true,
      useFindAndModify: false,
    }
  );
  await dbClose();
  return mongo_promise;
};

// const createJoin = async (deckId, problemId) => {
//   addProblemToDeck(deckId, problemId);
//   addDeckToProblem(problemId, deckId);
// };

// READ
const list = async (type) => {
  await dbConnect();
  let mongo_promise = null;
  if (type == "Deck") {
    mongo_promise = await Deck.find();
  } else if (type == "Problem") {
    mongo_promise = await Problem.find();
  }
  await dbClose();
  const results = [];
  mongo_promise.forEach((result) => {
    results.push(result.title);
  });
  return results;
};

const retrieve = async (title, type) => {
  await dbConnect();
  let mongo_promise = null;
  if (type == "Deck") {
    mongo_promise = await Deck.findOne({
      title: title,
    });
  } else if (type == "Problem") {
    mongo_promise = await Problem.findOne({
      title: title,
    });
  }
  await dbClose();
  return mongo_promise;
};

// returns only the titles of the 3 documents
const getThreeTitles = async () => {
  await dbConnect();
  const mongo_promise = await Deck.find().limit(3);
  await dbClose();
  const results = [];
  mongo_promise.forEach((result) => {
    results.push(result.title);
  });
  return results;
};

const getRandom = async () => {
  await dbConnect();
  const mongo_promise = await Problem.aggregate([
    {
      $sample: {
        size: 1,
      },
    },
  ]);
  await dbClose();
  return mongo_promise;
};

// DELETE
const destroy = async (title, type) => {
  await dbConnect();
  let mongo_promise = null;
  if (type == "Deck") {
    mongo_promise = await Deck.deleteOne({
      title: title,
    });
  } else if (type == "Problem") {
    mongo_promise = await Problem.deleteOne({
      title: title,
    });
  }
  await dbClose();
  return mongo_promise;
};

module.exports = {
  dbConnect,
  create,
  addProblemToDeck,
  // addDeckToProblem,
  // createJoin,
  list,
  retrieve,
  getThreeTitles,
  getThreeRefactor,
  getRandom,
  destroy,
};
