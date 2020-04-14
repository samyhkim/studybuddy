const inquirer = require("inquirer");
const chalk = require("chalk");

const rateNotes = {
  type: "list",
  message: chalk.gray("Rate problem difficulty:"),
  name: "choice",
  choices: [
    { name: chalk.green("Easy"), value: 2 },
    { name: chalk.rgb(255, 136, 0)("Medium"), value: 1 },
    { name: chalk.red("Hard"), value: 0 },
    "Edit Notes",
    new inquirer.Separator(),
    chalk.gray("Back to Problem"),
  ],
};

const rateSolution = {
  type: "list",
  message: chalk.gray("Rate problem difficulty:"),
  name: "choice",
  choices: [
    { name: chalk.green("Easy"), value: 2 },
    { name: chalk.rgb(255, 136, 0)("Medium"), value: 1 },
    { name: chalk.red("Hard"), value: 0 },
    "Edit Solution",
    new inquirer.Separator(),
    chalk.gray("Back to Problem"),
  ],
};

module.exports = { rateNotes, rateSolution };
