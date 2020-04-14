const inquirer = require("inquirer");
const chalk = require("chalk");
const stripAnsi = require("strip-ansi");
const { addNoteToProblem, addSolutionToProblem } = require("../../config/db");
const { studyMenu } = require("../../helpers/decks/study");
const { rateHandler } = require("./rate");
const { rateNotes, rateSolution } = require("../../helpers/decks/rate");
const { getProblem, openHandler } = require("../decks/open");

const viewNotes = async (deck, problem) => {
  console.log(chalk.red(problem.notes));
  const answer = await inquirer.prompt(rateNotes);

  if (answer.choice == "Back") {
    studyHandler(problem);
  } else if (answer.choice == "Edit Notes") {
    editNotes(problem);
  } else {
    await rateHandler(deck, problem, answer.choice);
    getProblem(deck);
  }
};

const viewSolution = async (deck, problem) => {
  console.log(chalk.red(problem.solution));
  const answer = await inquirer.prompt(rateSolution);

  if (answer.choice == "Back") {
    studyHandler(problem);
  } else if (answer.choice == "Edit Solution") {
    editSolution(problem);
  } else {
    await rateHandler(deck, problem, answer.choice);
    getProblem(deck);
  }
};

const editNotes = async (problem) => {
  const answer = await inquirer.prompt({
    type: "editor",
    name: "notes",
    message: "Edit this problem's notes.",
    default: problem.notes,
  });

  await addNoteToProblem(problem._id, answer);

  studyHandler(problem);
};

const editSolution = async (problem) => {
  const answer = await inquirer.prompt({
    type: "editor",
    name: "solution",
    message: "Edit this problem's solution.",
    default: problem.solution,
  });

  await addSolutionToProblem(problem._id, answer);

  studyHandler(problem);
};

const studyHandler = async (deck, problem) => {
  console.log(chalk.bold.underline.yellow(problem.title));
  console.log(problem.prompt);

  const answer = await inquirer.prompt(studyMenu);
  if (answer.menuOptions == "View Notes") {
    viewNotes(deck, problem);
  } else if (answer.menuOptions == "View Solution") {
    viewSolution(deck, problem);
  } else if (answer.menuOptions == chalk.gray("Back to Deck")) {
    openHandler(deck);
  }
};

module.exports = { studyHandler };
