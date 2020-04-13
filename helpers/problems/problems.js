const chalk = require("chalk");

const problemMenu = {
  type: "list",
  name: "menuOptions",
  message: chalk.green.bold("Problems"),
  choices: ["Start", "View All", "Add", "Remove", "Main Menu"],
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
    type: "editor",
    name: "prompt",
    message: "Problem prompt?",
  },
  {
    type: "confirm",
    name: "solution",
    message: "Do you want to save a solution?",
    default: false,
  },
  {
    type: "editor",
    name: "solution",
    message: "Write your solution.",
    when: function (answers) {
      return answers.solution;
    },
  },
];
//   {
//     type: "confirm",
//     name: "notes",
//     message: "Do you want to save notes?",
//     default: false,
//     when: function (answers) {
//       return answers.solution != null;
//     },
//   },
//   {
//     type: "editor",
//     name: "notes",
//     message: "Write your notes.",
//     when: saysYes("notes"),
//   },
// ];

// function saysYes(question) {
//   return function (answers) {
//     return answers[question];
//   };
// }

const addNotes = [
  {
    type: "confirm",
    name: "notes",
    message: "Do you want to save notes?",
    default: false,
  },
  {
    type: "editor",
    name: "notes",
    message: "Write your notes.",
  },
];

module.exports = { problemMenu, workMenu, addQuestions, addNotes };
