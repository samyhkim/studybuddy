const mongoose = require("mongoose");
mongoose.set("useCreateIndex", true);
const stripAnsi = require("strip-ansi");
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
    .then()
    .catch((err) => console.error("dbConnect: Connection error", err));
};

const dbClose = async () => {
  await mongoose.connection
    .close()
    .then()
    .catch((err) => console.error("dbClose: Connection close error", err));
};

/*
--------------------------CREATE--------------------------
create(body, type) - create new deck or problem
createJoin(deckId, problemId) - create (deck, problem) association
addProblemToReview(deckId, problemId, dueDate) - add (deck, problem, dueDate) to Review
*/

const create = async (body, type) => {
  await dbConnect();
  let mongo_promise = null;
  if (type == "Deck") {
    mongo_promise = await Deck.create(body)
      .then()
      .catch((err) => console.error("create: Error while creating deck.", err));
  } else if (type == "Problem") {
    mongo_promise = await Problem.create(body)
      .then()
      .catch((err) =>
        console.error("create: Error while creating problem.", err)
      );
  }
  await dbClose();
  return mongo_promise;
};

const createJoin = async (deckId, problemId) => {
  const deck = await addProblemToDeck(deckId, problemId);
  await addDeckToProblem(problemId, deckId);
  return deck;
};

const addProblemToReview = async (deckId, problemId, dueDate) => {
  const body = { deckId: deckId, problemId: problemId, dueDate: dueDate };
  await dbConnect();
  const mongo_promise = await Review.create(body)
    .then()
    .catch((err) =>
      console.error(
        "addProblemToReview: Error while adding problem to review.",
        err
      )
    );
  await dbClose();
  return mongo_promise;
};

/*
--------------------------READ--------------------------
list(type) - get all deck or problem documents
retrieveByTitle(title, type) - get one matching document by title
retrieveProblemById(problemId) - get one matching problem by id
getThreeTitles() - get title of first 3 documents
getRandom() - get random problem
getRandomFromDeck(deckId) - get random problem from deck
getDeckWithProblems(deckId) - get all problems of deck
listReview(deckId) - get all problems from review that are overdue and due today
getProblemFromReview(deckId, problemId) - get matching problem in deck's review queue
*/

const list = async (type) => {
  await dbConnect();
  let mongo_promise = null;
  if (type == "Deck") {
    mongo_promise = await Deck.find()
      .then()
      .catch((err) =>
        console.error("list: Error while retrieving decks.", err)
      );
  } else if (type == "Problem") {
    mongo_promise = await Problem.find()
      .then()
      .catch((err) =>
        console.error("list: Error while retrieving problems.", err)
      );
  }
  await dbClose();
  const results = [];
  mongo_promise.forEach((result) => {
    results.push(result.title);
  });
  return results;
};

const retrieveByTitle = async (title, type) => {
  await dbConnect();
  let mongo_promise = null;
  if (type == "Deck") {
    mongo_promise = await Deck.findOne({
      title: stripAnsi(title),
    })
      .then()
      .catch((err) =>
        console.error("retrieveByTitle: Error while retrieving deck.", err)
      );
  } else if (type == "Problem") {
    mongo_promise = await Problem.findOne({
      title: stripAnsi(title),
    })
      .then()
      .catch((err) =>
        console.error("retrieveByTitle: Error while retrieving problem.", err)
      );
  }
  await dbClose();
  return mongo_promise;
};

const retrieveProblemById = async (problemId) => {
  await dbConnect();
  const mongo_promise = await Problem.findById(problemId)
    .then()
    .catch((err) =>
      console.error("retrieveProblemById: Error while retrieving problem.", err)
    );
  await dbClose();
  return mongo_promise;
};

const getThreeTitles = async () => {
  await dbConnect();
  const mongo_promise = await Deck.find()
    .limit(3)
    .then()
    .catch((err) =>
      console.error("getThreeTitles: Error while retrieving problems.", err)
    );
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
  ])
    .then()
    .catch((err) =>
      console.error("getRandom: Error while retrieving problem.", err)
    );
  await dbClose();
  return mongo_promise;
};

const getRandomFromDeck = async (deckId) => {
  await dbConnect();
  const mongo_promise = await Deck.findById(deckId)
    .populate("problems")
    .then()
    .catch((err) =>
      console.error(
        "getRandomFromDeck: Error while retrieving deck or problems.",
        err
      )
    );
  await dbClose();
  const problems = mongo_promise.problems;
  const random = Math.floor(Math.random() * problems.length);
  return problems[random];
};

const getDeckWithProblems = async (deckId) => {
  await dbConnect();
  const mongo_promise = await Deck.findById(deckId)
    .populate("problems")
    .then()
    .catch((err) =>
      console.error(
        "getDeckWithProblems: Error while retrieving deck or problems.",
        err
      )
    );
  await dbClose();
  const results = [];
  const problems = mongo_promise.problems;
  problems.forEach((result) => {
    results.push(result.title);
  });
  return results;
};

const listReview = async (deckId) => {
  await dbConnect();
  const DAY_IN_MILLISECONDS = 24 * 60 * 60 * 1000;
  const today = Math.round(new Date().getTime() / DAY_IN_MILLISECONDS);
  const mongo_promise = await Review.find({
    deckId: { $eq: deckId },
    dueDate: { $lte: today },
  })
    .then()
    .catch((err) =>
      console.error("listReview: Error while retrieving review problems.", err)
    );
  await dbClose();
  return mongo_promise;
};

const getProblemFromReview = async (deckId, problemId) => {
  await dbConnect();
  const mongo_promise = await Review.findOne({
    deckId: { $eq: deckId },
    problemId: { $eq: problemId },
  })
    .then()
    .catch((err) =>
      console.error(
        "getProblemFromReview: Error while retrieving review problem.",
        err
      )
    );
  await dbClose();
  return mongo_promise;
};

/*
--------------------------UPDATE--------------------------
addProblemToDeck(deckId, problemId) - add problem association to deck
addDeckToProblem(problemId, deckId) - add deck association to problem
addNoteToProblem(problemId, notes) - add note to problem
addSolutionToProblem(problemId, solution) - add solution to problem
updateProblemDueDate(deckId, problemId, dueDate) - update problem's due date in deck's review queue
updateProblemProgress(problemId, progress) - update problem's progress
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
  )
    .then()
    .catch((err) =>
      console.error(
        "addProblemToDeck: Error while adding problem to deck.",
        err
      )
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
  )
    .then()
    .catch((err) =>
      console.error(
        "addDeckToProblem: Error while adding deck to problem.",
        err
      )
    );
  await dbClose();
  return mongo_promise;
};

const addNoteToProblem = async (problemId, notes) => {
  await dbConnect();
  const mongo_promise = await Problem.findByIdAndUpdate(
    problemId,
    {
      $set: {
        notes: notes,
      },
    },
    {
      new: true,
      useFindAndModify: false,
    }
  )
    .then()
    .catch((err) =>
      console.error(
        "addNoteToProblem: Error while adding note to problem.",
        err
      )
    );
  await dbClose();
  return mongo_promise;
};

const addSolutionToProblem = async (problemId, solution) => {
  await dbConnect();
  const mongo_promise = await Problem.findByIdAndUpdate(
    problemId,
    {
      $set: {
        solution: solution,
      },
    },
    {
      new: true,
      useFindAndModify: false,
    }
  )
    .then()
    .catch((err) =>
      console.error(
        "addSolutionToProblem: Error while adding solution to problem.",
        err
      )
    );
  await dbClose();
  return mongo_promise;
};

const updateProblemDueDate = async (deckId, problemId, dueDate) => {
  await dbConnect();
  const mongo_promise = await Review.findOneAndUpdate(
    {
      deckId: { $eq: deckId },
      problemId: { $eq: problemId },
    },
    {
      $set: {
        dueDate: dueDate,
      },
    },
    {
      new: true,
      useFindAndModify: false,
    }
  )
    .then()
    .catch((err) =>
      console.error(
        "updateProblemDueDate: Error while updating problem's due date.",
        err
      )
    );
  await dbClose();
  return mongo_promise;
};

const updateProblemProgress = async (problemId, progress) => {
  await dbConnect();
  const mongo_promise = await Problem.findByIdAndUpdate(
    problemId,
    {
      $set: {
        progress: progress,
      },
    },
    {
      new: true,
      useFindAndModify: false,
    }
  )
    .then()
    .catch((err) =>
      console.error(
        "updateProblemProgress: Error while changing problem's progress.",
        err
      )
    );
  await dbClose();
  return mongo_promise;
};

/*
--------------------------DELETE--------------------------
destroyByTitle(title, type) - delete deck or problem
destroyProblemById(problemId) - delete problem by id (not implemented in code base)
removeProblemFromDeck(deckId, problemId) - remove problem association from deck
removeDeckFromProblem(problemId, deckId) - remove deck association from problem
removeJoin(deckId, problemId) - remove (deck, problem) association
removeProblemFromReview(deckId, problemId) - removes problem from deck's review queue
*/

const destroyByTitle = async (title, type) => {
  await dbConnect();
  let mongo_promise = null;
  if (type == "Deck") {
    mongo_promise = await Deck.deleteOne({
      title: stripAnsi(title),
    })
      .then()
      .catch((err) =>
        console.error("destroyByTitle: Error while adding deleting deck.", err)
      );
  } else if (type == "Problem") {
    mongo_promise = await Problem.deleteOne({
      title: stripAnsi(title),
    })
      .then()
      .catch((err) =>
        console.error(
          "destroyByTitle: Error while adding deleting problem.",
          err
        )
      );
  }
  await dbClose();
  return mongo_promise;
};

const destroyProblemById = async (problemId) => {
  await dbConnect();
  const mongo_promise = await Problem.findByIdAndDelete(problemId)
    .then()
    .catch((err) =>
      console.error(
        "destroyProblemById: Error while adding deleting problem.",
        err
      )
    );
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
  )
    .then()
    .catch((err) =>
      console.error(
        "removeProblemFromDeck: Error while removing problem from deck.",
        err
      )
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
  )
    .then()
    .catch((err) =>
      console.error(
        "removeDeckFromProblem: Error while removing deck from problem.",
        err
      )
    );
  await dbClose();
  return mongo_promise;
};

const removeJoin = async (deckId, problemId) => {
  deck = await removeProblemFromDeck(deckId, problemId);
  await removeDeckFromProblem(problemId, deckId);
  return deck;
};

const removeProblemFromReview = async (deckId, problemId) => {
  await dbConnect();
  const mongo_promise = await Review.findOneAndDelete({
    deckId: { $eq: deckId },
    problemId: { $eq: problemId },
  })
    .then()
    .catch((err) =>
      console.error(
        "removeProblemFromReview: Error while removing problem from review.",
        err
      )
    );
  await dbClose();
  return mongo_promise;
};

module.exports = {
  create,
  createJoin,
  addProblemToReview,
  list,
  retrieveByTitle,
  retrieveProblemById,
  getThreeTitles,
  getRandom,
  getRandomFromDeck,
  getDeckWithProblems,
  listReview,
  getProblemFromReview,
  addNoteToProblem,
  addSolutionToProblem,
  updateProblemDueDate,
  updateProblemProgress,
  destroyByTitle,
  removeJoin,
  removeProblemFromReview,
};
