const inquirer = require("inquirer");
const chalk = require("chalk");
const {
  create,
  list,
  retrieve,
  getThreeRefactor,
  destroy,
} = require("../config/db");
const { deckMenu, addQuestions } = require("../constants/decks");
const { openDeckHandler } = require("./openDeck");

/*
TODO: is it possible to put "add" and "remove" functionality in "view all"?
      or trigger them with "+"/"-" keys?

removeDeck
TODO: add "Back" functionality -> return deckHandler()
TODO: maybe remove multiple?

FIXME: inefficiency
extract titles with getThree()
startDeck() takes title and reverse searches for id
pass id, title, and description to openDeckHandler()
*/

const startDeck = async (title) => {
  const deck = await retrieve(title, "Deck");

  openDeckHandler(deck);
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

const findDeck = (title) => {
  // Make case insensitive
  const search = new RegExp(title, "i");
  Deck.find({ title: search }).then((deck) => {
    console.log(deck);
    console.log(`${deck.length} matches`);
    db.connection.close();
  });
};

const playground = async () => {
  const problems = await getThreeRefactor();
  console.log(problems);
};

const deckHandler = async () => {
  const menu = await deckMenu();
  // console.log(menu);
  const answer = await inquirer.prompt(menu);
  // const answer = await inquirer.prompt(deckMenu); // try creating getDeckMenu()
  if (answer.menuOptions == "View All") {
    viewDecks();
  } else if (answer.menuOptions == "Add") {
    addDeck();
  } else if (answer.menuOptions == "Remove") {
    removeDeck();
  } else if (answer.menuOptions == "Main Menu") {
    playground();
  } else if (answer.menuOptions == "Exit") {
    return;
  } else {
    // passing selected title
    startDeck(answer.menuOptions);
  }
};

module.exports = { deckHandler };
