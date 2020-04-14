const inquirer = require("inquirer");
const chalk = require("chalk");
const { mainMenu } = require("../helpers/index");

const mainHandler = async () => {
  const answer = await inquirer.prompt(mainMenu);

  if (answer.menuOptions == "📚 Decks") {
    deckHandler();
  } else if (answer.menuOptions == "💡 Problems") {
    problemHandler();
  } else if (answer.menuOptions == chalk.gray("Exit")) {
    process.exit();
  }
};

module.exports = { mainHandler };
const { deckHandler } = require("./decks/decks");
const { problemHandler } = require("./problems/problems");
