const inquirer = require("inquirer");
const { addNoteToProblem, addSolutionToProblem } = require("../../config/db");
const { studyMenu } = require("../../constants/decks/study");
const { rateHandler } = require("../rate");
const { rateProblem } = require("../../constants/rate");
const { getProblem } = require("../decks/open");

/*
TODO: Should "back" be the previous problem or the previous menu?
*/

const view = async (deck, problem, type) => {
  if (type == "Notes") {
    console.log(problem.notes);
  } else if (type == "Solution") {
    console.log(problem.solution);
  }
  const answer = await inquirer.prompt(rateProblem);
  if (answer.choice == "Back") {
    studyHandler(problem);
  } else {
    await rateHandler(deck, problem, answer.choice);
    getProblem();
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
  console.log(problem.title);
  console.log(problem.prompt);
  const answer = await inquirer.prompt(studyMenu);
  if (
    answer.menuOptions == "View Notes" ||
    answer.menuOptions == "View Solution"
  ) {
    view(deck, problem, answer.menuOptions);
  } else if (answer.menuOptions == "Edit Notes") {
    editNotes(problem);
  } else if (answer.menuOptions == "Edit Solution") {
    editSolution(problem);
  } else if (answer.menuOptions == "Back") {
  }
};

module.exports = { studyHandler };
