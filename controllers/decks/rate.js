const SRM = require("../../config/algo");
const {
  addProblemToReview,
  getProblemFromReview,
  updateProblemDueDate,
  updateProblemProgress,
} = require("../../config/db");

const rateHandler = async (deck, problem, answer) => {
  const algo = new SRM();
  const DAY_IN_MILLISECONDS = 24 * 60 * 60 * 1000;
  const today = Math.round(new Date().getTime() / DAY_IN_MILLISECONDS);
  const newInfo = algo.calculate(answer, problem, today);
  const problemInReview = await getProblemFromReview(deck._id, problem._id);

  if (problemInReview) {
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
