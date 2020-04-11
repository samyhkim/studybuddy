const inquirer = require("inquirer");
const {
  openMenu,
  askExisting,
  addQuestions,
  askAgain,
} = require("../../constants/decks/open");
const {
  create,
  createJoin,
  list,
  retrieve,
  getDeckWithProblem,
  removeJoin,
} = require("../../config/db");
const { deckHandler } = require("./decks");

/*
start
TODO: get problem from review queue first
        if there are none to do, then do new problems

viewProblems
TODO: start selected problem

viewReview
TODO: get all problems from review that are overdue and due today

removeProblem
TODO: ask to remove from just the deck or from all problems
*/

const start = async () => {};

const addProblem = async (deck) => {
  let answer = await inquirer.prompt(askExisting);
  let problem = null;
  if (answer.existing) {
    problem = await addExisting();
  } else {
    problem = await addNew();
  }
  const join = await createJoin(deck._id, problem._id);
  answer = await inquirer.prompt(askAgain);
  if (answer.again) {
    addProblem(deck);
  }
  openHandler(deck);
};

const addExisting = async () => {
  const problems = await list("Problem");
  const answer = await inquirer.prompt([
    {
      type: "list",
      name: "title",
      choices: problems,
    },
  ]);
  const problem = await retrieve(answer.title, "Problem");
  return problem;
};

const addNew = async () => {
  const answers = await inquirer.prompt(addQuestions);
  if (answers.solution) {
    const solution = await inquirer.prompt(addSolution);
    answers.solution = solution.solution;
  }
  const problem = await create(answers, "Problem");
  console.log("New Problem Added");
  console.log(problem.title);
  console.log(problem.prompt);
  console.log(problem.solution);
  return problem;
};

const viewProblems = async (deck) => {
  const problems = await getDeckWithProblem(deck._id);
  const answer = await inquirer.prompt([
    {
      type: "list",
      name: "title",
      choices: problems,
    },
  ]);
};

const viewReview = async () => {};

const removeProblem = async (deck) => {
  const problems = await getDeckWithProblem(deck._id);
  const answer = await inquirer.prompt([
    {
      type: "list",
      name: "title",
      message: "What problem do you want to remove?",
      choices: problems,
    },
    {
      type: "confirm",
      name: "confirm",
      message: "Are you sure?",
      default: false,
    },
  ]);
  if (answer.confirm) {
    const problem = await retrieve(answer.title, "Problem");
    const join = await removeJoin(deck._id, problem._id);
  }
  openHandler(deck);
};

const openHandler = async (deck) => {
  const answer = await inquirer.prompt(openMenu);
  if (answer.menuOptions == "Start") {
    start(problem);
  } else if (answer.menuOptions == "View Problems") {
    viewProblems(deck);
  } else if (answer.menuOptions == "Add Problem") {
    addProblem(deck);
  } else if (answer.menuOptions == "Remove Problem") {
    removeProblem(deck);
  } else if (answer.menuOptions == "Back") {
    deckHandler();
  }
};

module.exports = { openHandler };
