const chalk = require("chalk");
const { list } = require("../../config/db");

const problemMenu = {
  type: "list",
  name: "menuOptions",
  message: chalk.green.bold("💡 Problems"),
  choices: ["Start", "View All", "Add", "Remove", "Main Menu"],
};

const getViewProblems = async () => {
  const problems = await list("Problem");
  const choices = ["Back"];
  return {
    type: "list",
    name: "choice",
    choices: () => choices.concat(problems),
  };
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
];

const addSolution = [
  {
    type: "confirm",
    name: "confirm",
    message: "Do you want to save solution?",
    default: false,
  },
  {
    type: "editor",
    name: "solution",
    message: "Write your solution.",
    when: function (answer) {
      return answer.confirm;
    },
  },
];

const addNotes = [
  {
    type: "confirm",
    name: "confirm",
    message: "Do you want to save notes?",
    default: false,
  },
  {
    type: "editor",
    name: "notes",
    message: "Write your notes.",
    when: function (answer) {
      return answer.confirm;
    },
  },
];

const getRemoveProblem = async () => {
  const problems = await list("Problem");
  const choices = ["Back"];
  return [
    {
      type: "list",
      name: "choice",
      message: "What problem do you want to remove?",
      choices: () => choices.concat(problems),
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

module.exports = {
  problemMenu,
  getViewProblems,
  addQuestions,
  addSolution,
  addNotes,
  getRemoveProblem,
};
