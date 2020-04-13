const mongoose = require("mongoose");
const Problem = require("../models/problems");
const Deck = require("../models/decks");
const Review = require("../models/review");

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

/*
--------------------------CREATE--------------------------
create()
createJoin()
*/

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

const createJoin = async (deckId, problemId) => {
  await addProblemToDeck(deckId, problemId);
  await addDeckToProblem(problemId, deckId);
};

/*
--------------------------READ--------------------------
list()
retrieve()
getThreeTitles() - returns only the titles of the 3 documents
getRandom()
getRandomFromDeck()
getDeckWithProblems()
*/

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

const getRandomFromDeck = async (deckId) => {
  await dbConnect();
  const mongo_promise = await Deck.findById(deckId).populate("problems");
  await dbClose();
  const problems = mongo_promise.problems;
  const random = Math.floor(Math.random() * problems.length);
  return problems[random];
};

const getDeckWithProblems = async (deckId) => {
  await dbConnect();
  const mongo_promise = await Deck.findById(deckId).populate("problems");
  await dbClose();
  const results = [];
  const problems = mongo_promise.problems;
  problems.forEach((result) => {
    results.push(result.title);
  });
  return results;
};

/*
--------------------------UPDATE--------------------------
addProblemToDeck()
addDeckToProblem()
addNoteToProblem()
addSolutionToProblem()
*/

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

const addNoteToProblem = async (problemId, body) => {
  await dbConnect();
  const mongo_promise = await Problem.findByIdAndUpdate(
    problemId,
    {
      $set: {
        notes: body.notes,
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

const addSolutionToProblem = async (problemId, body) => {
  await dbConnect();
  const mongo_promise = await Problem.findByIdAndUpdate(
    problemId,
    {
      $set: {
        solution: body.solution,
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

/*
--------------------------DELETE--------------------------
destroy()
removeProblemFromDeck()
removeDeckFromProblem()
removeJoin()
*/

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

const removeProblemFromDeck = async (deckId, problemId) => {
  await dbConnect();
  const mongo_promise = await Deck.findByIdAndUpdate(
    deckId,
    {
      $pull: {
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

const removeDeckFromProblem = async (problemId, deckId) => {
  await dbConnect();
  const mongo_promise = await Problem.findByIdAndUpdate(
    problemId,
    {
      $pull: {
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

const removeJoin = async (deckId, problemId) => {
  await removeProblemFromDeck(deckId, problemId);
  await removeDeckFromProblem(problemId, deckId);
};

/*
--------------------------REVIEW--------------------------
addToReview()
listReviews() - TODO: get all problems from review that are overdue and due today
getNextFromReview()
updateProblemQueue()
*/

const addProblemToReview = async (deckId, problemId, dueDate) => {
  const body = { deck: deckId, problem: problemId, dueDate: dueDate };
  await dbConnect();
  const mongo_promise = await Review.create(body);
  await dbClose();
  return mongo_promise;
};

const listReviews = async (deckId) => {
  await dbConnect();
  const mongo_promise = await Review.find({ deck: { $eq: deckId } }).sort({
    dueDate: 1,
  });
  await dbClose();
  console.log(mongo_promise);
  return mongo_promise;
};

// look in review index and get next dueDate, return problem
const getNextFromReview = async (deckId) => {
  await dbConnect();
  const DAY_IN_MILLISECONDS = 24 * 60 * 60 * 1000;
  const today = Math.round(new Date().getTime() / DAY_IN_MILLISECONDS);
  const mongo_promise = await Review.find({
    deck: { $eq: deckId },
    dueDate: { $lte: today },
  });
  await dbClose();
  return mongo_promise;
};

const updateProblemDueDate = async (deckId, problemId, newInfo) => {
  await dbConnect();
  const mongo_promise = await Review.findOneAndUpdate(
    {
      deck: { $eq: deckId },
      problem: { $eq: problemId },
    },
    {
      $set: {
        dueDate: newInfo.dueDate,
      },
    },
    {
      new: true,
      useFindAndModify: false,
    }
  );
  await dbClose();
  // return mongo_promise;
  console.log(mongo_promise);
};

module.exports = {
  create,
  createJoin,
  addNoteToProblem,
  addSolutionToProblem,
  list,
  retrieve,
  getThreeTitles,
  getRandom,
  getRandomFromDeck,
  getDeckWithProblems,
  destroy,
  removeJoin,
  addProblemToReview,
  listReviews,
  getNextFromReview,
  updateProblemDueDate,
};
