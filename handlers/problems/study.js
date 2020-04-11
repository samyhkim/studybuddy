const inquirer = require("inquirer");
const { retrieve } = require("../../config/db");
const { studyMenu, nextProblem } = require("../../constants/problems/study");
const { startProblem } = require("./problems");

/*
viewNotes
TODO: next or go back

viewSolution
TODO: next or go back

editNotes
TODO: open editor
TODO: save and go back

editSolution
TODO: open editor
TODO: save and go back

Should "back" be the previous problem or the previous menu?
*/

const viewNotes = async (problem) => {
  const answer = await inquirer.prompt(nextProblem);
  if (answer.choice == "Next") {
    startProblem();
  }
  studyHandler(problem);
};
const viewSolution = async (problem) => {
  const answer = await inquirer.prompt(nextProblem);
  if (answer.choice == "Next") {
    startProblem();
  }
  studyHandler(problem);
};

const studyHandler = async (problem) => {
  console.log(problem);
  const answer = await inquirer.prompt(studyMenu);
  if (answer.menuOptions == "View Notes") {
    viewNotes(problem);
  } else if (answer.menuOptions == "View Solution") {
    viewSolution(problem);
  } else if (answer.menuOptions == "Edit Notes") {
    editNotes();
  } else if (answer.menuOptions == "Edit Solution") {
    editSolution();
  } else if (answer.menuOptions == "Back") {
  }
};

module.exports = { studyHandler };
