const chalk = require("chalk");

const askExisting = [
  {
    type: "confirm",
    name: "existing",
    message: "Do you want to add from existing problems?",
    default: true,
  },
];

const askAgain = [
  {
    type: "confirm",
    name: "existing",
    message: "Do you want to add another problem?",
    default: true,
  },
];

const addQuestions = [
  {
    type: "input",
    name: "title",
    message: "Problem title?",
  },
  {
    type: "input",
    name: "prompt",
    message: "Problem prompt?",
  },
  {
    type: "confirm",
    name: "solution",
    message: "Do you want to save solution?",
    default: false,
  },
];

const getOpenMenu = async (deck) => {
  return {
    type: "list",
    name: "menuOptions",
    message: chalk.bold.yellow(deck.title),
    choices: [
      "Start",
      "View Review",
      "View Problems",
      "Add Problem",
      "Remove Problem",
      "Back",
    ],
  };
};

module.exports = { getOpenMenu, askExisting, addQuestions, askAgain };
