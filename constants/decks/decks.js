const chalk = require("chalk");
const { getThreeTitles } = require("../../config/db");

const deckMenu = async () => {
  const titles = await getThreeTitles();
  const menu = titles.concat(["View All", "Add", "Remove", "Main Menu"]);
  return {
    type: "list",
    name: "menuOptions",
    message: chalk.green.bold("Decks"),
    choices: menu,
  };
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

module.exports = { deckMenu, addQuestions };
