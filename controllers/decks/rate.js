const SRM = require("../../config/algo");
const {
  addProblemToReview,
  updateProblemDueDate,
  updateProblemProgress,
} = require("../../config/db");

/*
DONE: how to handle problem progress update?
*/

const rateHandler = async (deck, problem, answer) => {
  const algo = new SRM();
  const DAY_IN_MILLISECONDS = 24 * 60 * 60 * 1000;
  const today = Math.round(new Date().getTime() / DAY_IN_MILLISECONDS);
  // take rating, put it in calculate, receive new dueDate and updated progress
  const newInfo = algo.calculate(answer, problem, today);
  if (problem.dueDate == 0) {
    await addProblemToReview(deck._id, problem._id, newInfo.dueDate)
      .then(() => console.log("Added to review."))
      .catch((err) => console.log(err));
  } else {
    // TODO: still haven't tested updateProblemDueDate
    await updateProblemDueDate(deck._id, problem._id, newInfo.dueDate)
      .then(() => console.log("Review updated."))
      .catch((err) => console.log(err));
  }
  await updateProblemProgress(problem._id, newInfo.progress);
};

module.exports = { rateHandler };
