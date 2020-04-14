const SRM = require("../../config/algo");
const {
  addProblemToReview,
  getProblemFromReview,
  updateProblemDueDate,
  updateProblemProgress,
} = require("../../config/db");

/*
DONE: keeps reading problem.dueDate as 0, so adds to review instead of updating the same one
should look if problem exists in review instead
*/

const rateHandler = async (deck, problem, answer) => {
  const algo = new SRM();
  const DAY_IN_MILLISECONDS = 24 * 60 * 60 * 1000;
  const today = Math.round(new Date().getTime() / DAY_IN_MILLISECONDS);
  // take rating, put it in calculate, receive new dueDate and updated progress
  const newInfo = algo.calculate(answer, problem, today);
  const problemInReview = await getProblemFromReview(deck._id, problem._id);
  if (problemInReview) {
    // DONE: still haven't tested updateProblemDueDate
    await updateProblemDueDate(deck._id, problem._id, newInfo.dueDate)
      .then(() => console.log("Review updated."))
      .catch((err) => console.log(err));
  } else {
    await addProblemToReview(deck._id, problem._id, newInfo.dueDate)
      .then(() => console.log("Added to review."))
      .catch((err) => console.log(err));
  }
  await updateProblemProgress(problem._id, newInfo.progress);
};

module.exports = { rateHandler };
