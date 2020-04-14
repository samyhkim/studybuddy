const inquirer = require("inquirer");
const chalk = require("chalk");
const {
  create,
  list,
  retrieve,
  retrieveProblemById,
  listReview,
  getDeckWithProblems,
} = require("../../config/db");

const getOpenMenu = async (deck) => {
  return {
    type: "list",
    name: "menuOptions",
    message: chalk.bold.green(deck.title),
    choices: [
      new inquirer.Separator(),
      chalk.green("Start"),
      "View Review",
      "View Problems",
      "Add Problem",
      "Remove Problem",
      new inquirer.Separator(),
      chalk.gray("Back to Decks"),
    ],
  };
};

const getViewReview = async (deck) => {
  const titles = await getReviewTitles(deck);
  titles.forEach(
    (title, index, coloredTitles) =>
      (coloredTitles[index] = chalk.bold.yellow(title))
  );
  const choices = [new inquirer.Separator(), "Back", new inquirer.Separator()];
  return {
    type: "list",
    name: "choice",
    message: chalk.gray("Review queue:"),
    choices: () => choices.concat(titles),
  };
};

const getReviewTitles = async (deck) => {
  const reviewProblems = await listReview(deck._id);
  const titles = [];
  for (let index = 0; index < reviewProblems.length; index++) {
    const title = await retrieveProblemById(reviewProblems[index].problem);
    titles.push(title.title);
  }
  return titles;
};

const getReviewProblems = async (deck) => {
  const reviewProblems = await listReview(deck._id);
  const problems = [];
  for (let index = 0; index < reviewProblems.length; index++) {
    const problem = await retrieveProblemById(reviewProblems[index].problem);
    problems.push(problem);
  }
  return problems;
};

const getViewProblems = async (deck) => {
  const problems = await getDeckWithProblems(deck._id);
  problems.forEach(
    (problem, index, coloredProblems) =>
      (coloredProblems[index] = chalk.bold.yellow(problem))
  );
  const choices = [new inquirer.Separator(), "Back", new inquirer.Separator()];
  return {
    type: "list",
    name: "choice",
    message: chalk.gray("Deck's problems:"),
    choices: () => choices.concat(problems),
  };
};

const getRemoveProblem = async (deck) => {
  const problems = await getDeckWithProblems(deck._id);
  problems.forEach(
    (problem, index, coloredProblems) =>
      (coloredProblems[index] = chalk.bold.yellow(problem))
  );
  const choices = [new inquirer.Separator(), "Back", new inquirer.Separator()];
  return [
    {
      type: "list",
      name: "choice",
      message: chalk.bold.red("What problem do you want to remove?"),
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

const getAddExisting = async () => {
  const problems = await list("Problem");
  problems.forEach(
    (problem, index, coloredProblems) =>
      (coloredProblems[index] = chalk.bold.yellow(problem))
  );
  return {
    type: "list",
    name: "choice",
    message: chalk.gray("Your problems:"),
    choices: problems,
  };
};

const addExisting = async () => {
  const problems = await getAddExisting();
  const answer = await inquirer.prompt(problems);
  const problem = await retrieve(answer.choice, "Problem");
  return problem;
};

const addNew = async () => {
  const answers = await inquirer.prompt(addQuestions);
  const solution = await inquirer.prompt(addSolution);
  const notes = await inquirer.prompt(addNotes);

  if (solution.solution) {
    answers.solution = solution.solution;
  }
  if (notes.notes) {
    answers.notes = notes.notes;
  }

  const problem = await create(answers, "Problem");
  console.log("New Problem Added: " + chalk.bold.yellow(problem.title));
  return problem;
};

const askExisting = [
  {
    type: "confirm",
    name: "choice",
    message: "Do you want to add from existing problems?",
    default: true,
  },
];

const askAgain = [
  {
    type: "confirm",
    name: "choice",
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

module.exports = {
  getOpenMenu,
  getViewReview,
  getViewProblems,
  getReviewTitles,
  getReviewProblems,
  getRemoveProblem,
  askExisting,
  addExisting,
  addNew,
  askAgain,
};
