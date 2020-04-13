const inquirer = require("inquirer");
const chalk = require("chalk");

const mainMenu = {
  type: "list",
  name: "menuOptions",
  message: chalk.bold.green("StudyBuddy 🤓"),
  choices: [
    new inquirer.Separator(),
    "📚 Decks",
    "💡 Problems",
    new inquirer.Separator(),
  ],
};

module.exports = { mainMenu };
