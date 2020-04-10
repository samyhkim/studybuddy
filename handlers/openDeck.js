const inquirer = require("inquirer");
const {
  openDeckMenu,
  askExisting,
  addQuestions,
  askAgain,
} = require("../constants/openDeck");
const {
  addProblemToDeck,
  addDeckToProblem,
  list,
  retrieve,
} = require("../config/db");

// get problem from review queue first
// if there are none to do, then do new problems
const start = async () => {};

const addProblem = async (deck) => {
  // ask from existing or new?
  const answers = await inquirer.prompt(askExisting);
  let problem = null;
  if (answers.existing) {
    // get existing problems
    problem = await addExisting();
  } else {
    // create new problem and add to all problems
    problem = await addNew();
  }
  console.log(deck._id);
  console.log(problem._id);
  // get problem and add to joint table
  const resProblemToDeck = await addProblemToDeck(deck._id, problem._id);
  // const resDeckToProblem = await addDeckToProblem(deck._id, problem._id);
  console.log(resProblemToDeck);
  // console.log(resDeckToProblem);
  // ask if want to add another - recurisve.js
  // const again = await inquirer.prompt(askAgain);
  // if (answer.again) {
  //   addProblem(deck);
  // }

  // openDeckHandler();
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

  problemHandler();
};

// get all problems from joint table
const viewProblems = async () => {};

// get all problems from review that are overdue and due today
const viewReview = async () => {};

// ask to remove from just the deck or from all problems
const removeProblem = async () => {};

// recieves deck in form of object: {_id, title, description, _v}
const openDeckHandler = async (deck) => {
  const answer = await inquirer.prompt(openDeckMenu);
  if (answer.menuOptions == "Start") {
    start(problem);
  } else if (answer.menuOptions == "View Problems") {
    viewProblems(problem);
  } else if (answer.menuOptions == "Add Problem") {
    addProblem(deck);
  } else if (answer.menuOptions == "Remove Problems") {
    removeProblem();
  }
};

module.exports = { openDeckHandler };
