const inquirer = require("inquirer");
const {
  getRandom,
  addNoteToProblem,
  addSolutionToProblem,
} = require("../../config/db");
const { studyMenu, nextProblem } = require("../../constants/problems/study");

/*
TODO: Should "back" be the previous problem or the previous menu?
*/

const view = async (problem, type) => {
  if (type == "View Notes") {
    console.log(problem.notes);
  } else if (type == "View Solution") {
    console.log(problem.solution);
  }
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
  const updatedProblem = await addNoteToProblem(problem._id, answer);
  studyHandler(updatedProblem);
};

const editSolution = async (problem) => {
  const answer = await inquirer.prompt({
    type: "editor",
    name: "solution",
    message: "Edit this problem's solution.",
    default: problem.solution,
  });
  const updatedProblem = await addSolutionToProblem(problem._id, answer);
  studyHandler(updatedProblem);
};

const studyHandler = async (problem) => {
  console.log(problem.title);
  console.log(problem.prompt);
  const answer = await inquirer.prompt(studyMenu);
  if (
    answer.menuOptions == "View Notes" ||
    answer.menuOptions == "View Solution"
  ) {
    view(problem, answer.menuOptions);
  } else if (answer.menuOptions == "Edit Notes") {
    editNotes(problem);
  } else if (answer.menuOptions == "Edit Solution") {
    editSolution(problem);
  } else if (answer.menuOptions == "Back") {
  }
};

module.exports = { studyHandler };
