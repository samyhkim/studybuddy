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

const openMenu = {
  type: "list",
  name: "menuOptions",
  choices: ["Start", "View Problems", "Add Problem", "Remove Problem", "Back"],
};

module.exports = { openMenu, askExisting, addQuestions, askAgain };
