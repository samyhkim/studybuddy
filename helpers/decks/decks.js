const chalk = require("chalk");
const { list, getThreeTitles } = require("../../config/db");

const getDeckMenu = async () => {
  const titles = await getThreeTitles();
  const menu = titles.concat(["View All", "Add", "Remove", "Main Menu"]);
  return {
    type: "list",
    name: "menuOptions",
    message: chalk.green.bold("📚 Decks"),
    choices: menu,
  };
};

const getViewDeck = async () => {
  const decks = await list("Deck");
  const choices = ["Back"];
  return {
    type: "list",
    name: "choice",
    choices: () => choices.concat(decks),
  };
};

const getRemoveDeck = async () => {
  const decks = await list("Deck");
  const choices = ["Back"];
  return [
    {
      type: "list",
      name: "choice",
      message: "What deck do you want to remove?",
      choices: () => choices.concat(decks),
    },
    {
      type: "confirm",
      name: "confirm",
      message: chalk.bold.red("Are you sure?"),
      default: false,
      when: function (answer) {
        return answer.title != "Back";
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
