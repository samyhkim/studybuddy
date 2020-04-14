const inquirer = require("inquirer");
const chalk = require("chalk");
const { create, retrieve, destroy } = require("../../config/db");
const {
  getDeckMenu,
  getViewDeck,
  getRemoveDeck,
  addQuestions,
} = require("../../helpers/decks/decks");
const { mainHandler } = require("../index");

const openDeck = async (title) => {
  const deck = await retrieve(title, "Deck");

  openHandler(deck);
};

const addDeck = async () => {
  const answers = await inquirer.prompt(addQuestions);

  const deck = await create(answers, "Deck");
  console.log("New Deck Added: " + chalk.bold.yellow(deck.title));

  deckHandler();
};

const viewDecks = async () => {
  const decks = await getViewDeck();
  const answer = await inquirer.prompt(decks);

  if (answer.choice == "Back") {
    deckHandler();
  } else {
    const deck = await retrieve(answer.choice, "Deck");

    openHandler(deck);
  }
};

const removeDeck = async () => {
  const decks = await getRemoveDeck();
  const answer = await inquirer.prompt(decks);

  if (answer.confirm) {
    const response = await destroy(answer.choice, "Deck");
    console.log(response);
  }

  deckHandler();
};

const deckHandler = async () => {
  const menu = await getDeckMenu();
  const answer = await inquirer.prompt(menu);

  if (answer.menuOptions == "View All") {
    viewDecks();
  } else if (answer.menuOptions == "Add") {
    addDeck();
  } else if (answer.menuOptions == "Remove") {
    removeDeck();
  } else if (answer.menuOptions == chalk.gray("Back to Main Menu")) {
    mainHandler();
  } else {
    openDeck(answer.menuOptions);
  }
};

module.exports = { deckHandler };

const { openHandler } = require("./open");
