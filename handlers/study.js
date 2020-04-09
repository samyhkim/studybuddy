const inquirer = require("inquirer");
const { studyMenu, rateProblem } = require("../constants/study");

/*
viewNotes
TODO: rate or go back
TODO: rate == next == start problem

viewSolution
TODO: rate or go back
TODO: rate == next == start problem

editNotes
TODO: open editor
TODO: save and go back

editSolution
TODO: open editor
TODO: save and go back
*/

const viewSolution = (problem) => {
  console.log(problem.solution);
  const answer = inquirer.prompt(rateProblem);
  if (answer.rating == "Back") {
    // do something
  }
  // push rating to db
  // getNextProblem()
};

const viewNotes = (problem) => {
  console.log(problem.notes);
  const answer = inquirer.prompt(rateProblem);
  if (answer.rating == "Back") {
    // do something
  }
  // push rating to db
  // getNextProblem()
};

const studyHandler = async (problem) => {
  const answer = await inquirer.prompt(studyMenu);
  if (answer.menuOptions == "View Notes") {
    viewNotes(problem);
  } else if (answer.menuOptions == "View Solution") {
    viewSolution(problem);
  } else if (answer.menuOptions == "Edit Notes") {
    editNotes();
  } else if (answer.menuOptions == "Edit Solution") {
    editSolution();
  }
};

module.exports = { studyHandler };
