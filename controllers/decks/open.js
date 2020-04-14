const inquirer = require("inquirer");
const chalk = require("chalk");
const {
  getOpenMenu,
  getViewReview,
  getViewProblems,
  getReviewProblems,
  getRemoveProblem,
  addExisting,
  addNew,
  askExisting,
  askAgain,
} = require("../../helpers/decks/open");
const {
  createJoin,
  retrieve,
  getRandomFromDeck,
  removeJoin,
  removeProblemFromReview,
} = require("../../config/db");
const { deckHandler } = require("./decks");

/*
addExisting
DONE: check for duplicate add; we keep passing the same deck over and over so problems array doesnt update
      which means that when deck is empty, we can add the same problem over and over again
      or if we delete problem and try to add it again, the deck will think that it still has it

getProblem
DONE: viewProblem does not return titles so listReview is starting undefined problem

viewReview
DONE: return problem titles, currently returning review object (deckId, problemId, dueDate)

removeProblem
FIXME: removed problem should be removed from queue
      kind of works, removed one but others remain
*/

const getProblem = async (deck) => {
  let problems = await getReviewProblems(deck);

  if (problems.length > 0) {
    studyHandler(deck, problems[0]);
  } else {
    problem = await getRandomFromDeck(deck._id);
    if (problem) {
      studyHandler(deck, problem);
    } else {
      console.log(
        chalk.rgb(255, 136, 0).bold("There are no problems in your deck.")
      );
      openHandler(deck);
    }
  }
};

const viewReview = async (deck) => {
  const problems = await getViewReview(deck);
  const answer = await inquirer.prompt(problems);

  if (answer.choice == "Back") {
    openHandler(deck);
  } else {
    const problem = await retrieve(answer.choice, "Problem");
    studyHandler(deck, problem);
  }
};

const viewProblems = async (deck) => {
  const problems = await getViewProblems(deck);
  const answer = await inquirer.prompt(problems);

  if (answer.choice == "Back") {
    openHandler(deck);
  } else {
    const problem = await retrieve(answer.choice, "Problem");
    studyHandler(deck, problem);
  }
};

const addProblem = async (deck) => {
  let answer = await inquirer.prompt(askExisting);
  let problem = null;

  if (answer.choice) {
    problem = await addExisting();
  } else {
    problem = await addNew();
  }

  if (deck.problems.includes(problem._id)) {
    console.log(chalk.rgb(255, 136, 0).bold("Problem already is in deck."));
  } else {
    deck = await createJoin(deck._id, problem._id);
  }

  answer = await inquirer.prompt(askAgain);

  if (answer.choice) {
    addProblem(deck);
  } else {
    openHandler(deck);
  }
};

const removeProblem = async (deck) => {
  const problems = await getRemoveProblem(deck);
  const answer = await inquirer.prompt(problems);

  if (answer.confirm) {
    const problem = await retrieve(answer.choice, "Problem");
    deck = await removeJoin(deck._id, problem._id);
    await removeProblemFromReview(deck._id, problem._id);
  }

  openHandler(deck);
};

const openHandler = async (deck) => {
  const menu = await getOpenMenu(deck);
  const answer = await inquirer.prompt(menu);

  if (answer.menuOptions == chalk.green("Start")) {
    getProblem(deck);
  } else if (answer.menuOptions == "View Review") {
    viewReview(deck);
  } else if (answer.menuOptions == "View Problems") {
    viewProblems(deck);
  } else if (answer.menuOptions == "Add Problem") {
    addProblem(deck);
  } else if (answer.menuOptions == "Remove Problem") {
    removeProblem(deck);
  } else if (answer.menuOptions == chalk.gray("Back to Decks")) {
    deckHandler();
  }
};

module.exports = { getProblem, openHandler };
const { studyHandler } = require("./study");
