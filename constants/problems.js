const chalk = require("chalk");

const problemMenu = {
  type: "list",
  name: "menuOptions",
  message: chalk.green.bold("Problems"),
  choices: ["Start", "View All", "Add", "Remove", "Main Menu", "Exit"],
};

const workMenu = {
  type: "list",
  name: "menuOptions",
  choices: ["View Notes", "View Solution", "Edit Notes", "Edit Solution"],
};

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

const addSolution = {
  type: "editor",
  name: "solution",
  message: "Write your solution.",
};

module.exports = { problemMenu, workMenu, addQuestions, addSolution };
