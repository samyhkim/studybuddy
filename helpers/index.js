const inquirer = require("inquirer");
const chalk = require("chalk");

const mainMenu = {
  type: "list",
  name: "menuOptions",
  message: chalk.bold.cyan("StudyBuddy 🤓"),
  choices: [
    new inquirer.Separator(),
    "📚 Decks",
    "💡 Problems",
    new inquirer.Separator(),
    chalk.gray("Exit"),
  ],
};

module.exports = { mainMenu };
