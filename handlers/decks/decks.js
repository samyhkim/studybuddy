const inquirer = require("inquirer");
const chalk = require("chalk");
const {
  create,
  list,
  retrieve,
  getThreeTitles,
  destroy,
} = require("../../config/db");
const { deckMenu, addQuestions } = require("../../constants/decks/decks");
const { mainHandler } = require("../index");

/*
removeDeck
TODO: add "Back" functionality -> return deckHandler()
*/

const openDeck = async (title) => {
  const deck = await retrieve(title, "Deck");

  openHandler(deck);
};

const addDeck = async () => {
  const answers = await inquirer.prompt(addQuestions);
  const deck = await create(answers, "Deck");
  console.log("New Deck Added");
  // console.log(deck.title);
  // console.log(deck.description);
  console.log(deck);

  deckHandler();
};

const viewDecks = async () => {
  const decks = await list("Deck");
  const answer = await inquirer.prompt([
    {
      type: "list",
      name: "title",
      choices: decks,
    },
  ]);
  const deck = await retrieve(answer.title, "Deck");
  console.log(chalk.bold.yellow(deck.title));
  console.log(chalk.black.bgWhite(deck.description));
  deckHandler();
};

const removeDeck = async () => {
  const decks = await list("Deck");
  const answer = await inquirer.prompt([
    {
      type: "list",
      name: "title",
      message: "What deck do you want to remove?",
      choices: decks,
    },
    {
      type: "confirm",
      name: "confirm",
      message: "Are you sure?",
      default: false,
    },
  ]);
  if (answer.confirm) {
    const response = await destroy(answer.title, "Deck");
    console.log(response);
  }

  deckHandler();
};

const deckHandler = async () => {
  const menu = await deckMenu();
  const answer = await inquirer.prompt(menu);
  if (answer.menuOptions == "View All") {
    viewDecks();
  } else if (answer.menuOptions == "Add") {
    addDeck();
  } else if (answer.menuOptions == "Remove") {
    removeDeck();
  } else if (answer.menuOptions == "Main Menu") {
    mainHandler();
  } else {
    openDeck(answer.menuOptions);
  }
};

module.exports = { deckHandler };

const { openHandler } = require("./open");
