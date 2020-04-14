const inquirer = require("inquirer");
const chalk = require("chalk");

const studyMenu = {
  type: "list",
  name: "menuOptions",
  message: chalk.gray("Options"),
  choices: [
    new inquirer.Separator(),
    "View Solution",
    "View Notes",
    new inquirer.Separator(),
    chalk.gray("Back to Problems"),
  ],
};

const nextNotes = {
  type: "list",
  message: chalk.gray("Next problem?"),
  name: "choice",
  choices: [
    new inquirer.Separator(),
    chalk.green("Next"),
    "Edit Notes",
    new inquirer.Separator(),
    chalk.gray("Back to Problem"),
  ],
};

const nextSolution = {
  type: "list",
  message: chalk.gray("Next problem?"),
  name: "choice",
  choices: [
    new inquirer.Separator(),
    chalk.green("Next"),
    "Edit Solution",
    new inquirer.Separator(),
    chalk.gray("Back to Problem"),
  ],
};

module.exports = { studyMenu, nextNotes, nextSolution };
