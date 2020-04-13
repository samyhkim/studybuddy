const inquirer = require("inquirer");
const chalk = require("chalk");
const { list, getThreeTitles } = require("../../config/db");

const getDeckMenu = async () => {
  const titles = await getThreeTitles();
  if (titles.length > 0) {
    titles.unshift(new inquirer.Separator());
  }
  const menu = titles.concat([
    new inquirer.Separator(),
    "View All",
    "Add",
    "Remove",
    new inquirer.Separator(),
    "Back to Main Menu",
  ]);
  return {
    type: "list",
    name: "menuOptions",
    message: chalk.green.bold("📚 Decks"),
    choices: menu,
  };
};

const getViewDeck = async () => {
  const decks = await list("Deck");
  const choices = [new inquirer.Separator(), "Back", new inquirer.Separator()];
  return {
    type: "list",
    name: "choice",
    message: "Your decks:",
    choices: () => choices.concat(decks),
  };
};

const getRemoveDeck = async () => {
  const decks = await list("Deck");
  const choices = [new inquirer.Separator(), "Back", new inquirer.Separator()];
  return [
    {
      type: "list",
      name: "choice",
      message: chalk.bold.red("What deck do you want to remove?"),
      choices: () => choices.concat(decks),
    },
    {
      type: "confirm",
      name: "confirm",
      message: chalk.bold.red("Are you sure?"),
      default: false,
      when: function (answer) {
        return answer.choice != "Back";
      },
    },
  ];
};

const addQuestions = [
  {
    type: "input",
    name: "title",
    message: "Deck title?",
  },
  {
    type: "input",
    name: "description",
    message: "Deck description?",
  },
];

module.exports = { getDeckMenu, getViewDeck, getRemoveDeck, addQuestions };
