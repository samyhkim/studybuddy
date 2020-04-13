const mongoose = require("mongoose");
mongoose.set("useCreateIndex", true);
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
create() - create new deck or problem
createJoin() - create (deck, problem) association
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
  await addProblemToDeck(deckId, problemId);
  await addDeckToProblem(problemId, deckId);
};

/*
--------------------------READ--------------------------
list() - get all deck or problem documents
retrieve() - get one matching document by title
getThreeTitles() - get title of first 3 documents
getRandom() - get random problem
getRandomFromDeck() - get random problem from deck
getDeckWithProblems() - get all problems of deck
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

const retrieve = async (title, type) => {
  await dbConnect();
  let mongo_promise = null;
  if (type == "Deck") {
    mongo_promise = await Deck.findOne({
      title: title,
    })
      .then()
      .catch((err) =>
        console.error("retrieve: Error while retrieving deck.", err)
      );
  } else if (type == "Problem") {
    mongo_promise = await Problem.findOne({
      title: title,
    })
      .then()
      .catch((err) =>
        console.error("retrieve: Error while retrieving problem.", err)
      );
  }
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

/*
--------------------------UPDATE--------------------------
addProblemToDeck() - add problem association to deck
addDeckToProblem() - add deck association to problem
addNoteToProblem() - add note to problem
addSolutionToProblem() - add solution to problem
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

/*
--------------------------DELETE--------------------------
destroy() - delete deck or problem
destroyById() - delete problem by id
removeProblemFromDeck() - remove problem association from deck
removeDeckFromProblem() - remove deck association from problem
removeJoin() - remove (deck, problem) association
*/

const destroy = async (title, type) => {
  await dbConnect();
  let mongo_promise = null;
  if (type == "Deck") {
    mongo_promise = await Deck.deleteOne({
      title: title,
    })
      .then()
      .catch((err) =>
        console.error("destroy: Error while adding deleting deck.", err)
      );
  } else if (type == "Problem") {
    mongo_promise = await Problem.deleteOne({
      title: title,
    })
      .then()
      .catch((err) =>
        console.error("destroy: Error while adding deleting problem.", err)
      );
  }
  await dbClose();
  return mongo_promise;
};

const destroyById = async (problemId) => {
  await dbConnect();
  const mongo_promise = await Problem.findByIdAndDelete(problemId)
    .then()
    .catch((err) =>
      console.error("destroy: Error while adding deleting problem.", err)
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
  await removeProblemFromDeck(deckId, problemId);
  await removeDeckFromProblem(problemId, deckId);
};

/*
--------------------------REVIEW--------------------------
addProblemToReview() - add (deck, problem, dueDate) to Review
listReviews() - get all problems from review that are overdue and due today
getNextFromReview() - look at (deck, dueDate) and return if dueDate lte today
updateProblemQueue() - find matching (deck, problem) and update its dueDate
*/

const addProblemToReview = async (deckId, problemId, dueDate) => {
  const body = { deck: deckId, problem: problemId, dueDate: dueDate };
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

const listReview = async (deckId) => {
  await dbConnect();
  const DAY_IN_MILLISECONDS = 24 * 60 * 60 * 1000;
  const today = Math.round(new Date().getTime() / DAY_IN_MILLISECONDS);
  const mongo_promise = await Review.find({
    deck: { $eq: deckId },
    dueDate: { $lte: today },
  })
    .then()
    .catch((err) =>
      console.error("listReview: Error while retrieving review problems.", err)
    );
  await dbClose();
  return mongo_promise;
};

const updateProblemDueDate = async (deckId, problemId, dueDate) => {
  await dbConnect();
  const mongo_promise = await Review.findOneAndUpdate(
    {
      deck: { $eq: deckId },
      problem: { $eq: problemId },
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
  destroyById,
  removeJoin,
  addProblemToReview,
  listReview,
  updateProblemDueDate,
};
