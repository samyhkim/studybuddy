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
    chalk.gray("Back to Deck"),
  ],
};

module.exports = { studyMenu };
