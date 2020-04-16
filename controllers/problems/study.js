const inquirer = require("inquirer");
const chalk = require("chalk");
const {
  getRandom,
  addNoteToProblem,
  addSolutionToProblem,
} = require("../../config/db");
const {
  studyMenu,
  nextNotes,
  nextSolution,
} = require("../../helpers/problems/study");
const { problemHandler } = require("./problems");

const viewSolution = async (problem) => {
  console.log(chalk.red(problem.solution));
  const answer = await inquirer.prompt(nextSolution);

  if (answer.choice == "Next") {
    const problem = await getRandom();
    studyHandler(problem[0]);
  } else if (answer.choice == "Edit Solution") {
    editSolution(problem);
  } else {
    studyHandler(problem);
  }
};

const viewNotes = async (problem) => {
  console.log(chalk.red(problem.notes));
  const answer = await inquirer.prompt(nextNotes);

  if (answer.choice == chalk.green("Next")) {
    const problem = await getRandom();
    studyHandler(problem[0]);
  } else if (answer.choice == "Edit Notes") {
    editNotes(problem);
  } else {
    studyHandler(problem);
  }
};

const editSolution = async (problem) => {
  const answer = await inquirer.prompt({
    type: "editor",
    name: "solution",
    message: "Edit this problem's solution.",
    default: problem.solution,
  });

  const updatedProblem = await addSolutionToProblem(
    problem._id,
    answer.solution
  );

  studyHandler(updatedProblem);
};

const editNotes = async (problem) => {
  const answer = await inquirer.prompt({
    type: "editor",
    name: "notes",
    message: "Edit this problem's notes.",
    default: problem.notes,
  });

  const updatedProblem = await addNoteToProblem(problem._id, answer.notes);

  studyHandler(updatedProblem);
};

const studyHandler = async (problem) => {
  console.log(chalk.bold.underline.yellow(problem.title));
  console.log(problem.prompt);

  const answer = await inquirer.prompt(studyMenu);
  if (answer.menuOptions == "View Solution") {
    viewSolution(problem);
  } else if (answer.menuOptions == "View Notes") {
    viewNotes(problem);
  } else if (answer.menuOptions == chalk.gray("Back to Problems")) {
    problemHandler();
  }
};

module.exports = { studyHandler };
