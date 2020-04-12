const inquirer = require("inquirer");
const {
  getRandom,
  addNoteToProblem,
  addSolutionToProblem,
} = require("../../config/db");
const { studyMenu, nextProblem } = require("../../constants/problems/study");

/*
editNotes
FIXED: open editor
FIXED: save and go back

editSolution
FIXED: open editor
FIXED: save and go back

TODO: Should "back" be the previous problem or the previous menu?
*/

const viewNotes = async (problem) => {
  console.log(problem.notes);
  const answer = await inquirer.prompt(nextProblem);
  if (answer.choice == "Next") {
    const problem = await getRandom();
    studyHandler(problem[0]);
  } else {
    studyHandler(problem);
  }
};

const viewSolution = async (problem) => {
  console.log(problem.solution);
  const answer = await inquirer.prompt(nextProblem);
  if (answer.choice == "Next") {
    const problem = await getRandom();
    studyHandler(problem[0]);
  } else {
    studyHandler(problem);
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

const studyHandler = async (problem) => {
  console.log(problem.title);
  console.log(problem.prompt);
  const answer = await inquirer.prompt(studyMenu);
  if (answer.menuOptions == "View Notes") {
    viewNotes(problem);
  } else if (answer.menuOptions == "View Solution") {
    viewSolution(problem);
  } else if (answer.menuOptions == "Edit Notes") {
    editNotes(problem);
  } else if (answer.menuOptions == "Edit Solution") {
    editSolution(problem);
  } else if (answer.menuOptions == "Back") {
  }
};

module.exports = { studyHandler };
