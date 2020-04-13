const inquirer = require("inquirer");
const { mainMenu } = require("../helpers/index");

const mainHandler = async () => {
  const answer = await inquirer.prompt(mainMenu);
  if (answer.menuOptions == "📚 Decks") {
    deckHandler();
  } else if (answer.menuOptions == "💡 Problems") {
    problemHandler();
  }
};

module.exports = { mainHandler };

const { deckHandler } = require("./decks/decks");
const { problemHandler } = require("./problems/problems");
