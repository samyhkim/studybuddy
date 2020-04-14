const inquirer = require("inquirer");
const chalk = require("chalk");
const { create, retrieve, getRandom, destroy } = require("../../config/db");
const {
  problemMenu,
  getViewProblems,
  addQuestions,
  addSolution,
  addNotes,
  getRemoveProblem,
} = require("../../helpers/problems/problems");
const { mainHandler } = require("../index");

const startRandom = async () => {
  const problem = await getRandom();

  studyHandler(problem[0]);
};

const viewProblems = async () => {
  const problems = await getViewProblems();
  const answer = await inquirer.prompt(problems);

  if (answer.choice == "Back") {
    problemHandler();
  } else {
    const problem = await retrieve(answer.choice, "Problem");
    studyHandler(problem);
  }
};

const addProblem = async () => {
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

  problemHandler();
};

const removeProblem = async () => {
  const problems = await getRemoveProblem();
  const answer = await inquirer.prompt(problems);

  if (answer.confirm) {
    await destroy(answer.choice, "Problem");
  }

  problemHandler();
};

const problemHandler = async () => {
  const answer = await inquirer.prompt(problemMenu);

  if (answer.menuOptions == chalk.green("Start")) {
    startRandom();
  } else if (answer.menuOptions == "View All") {
    viewProblems();
  } else if (answer.menuOptions == "Add") {
    addProblem();
  } else if (answer.menuOptions == "Remove") {
    removeProblem();
  } else if (answer.menuOptions == chalk.gray("Back to Main Menu")) {
    mainHandler();
  }
};

module.exports = { problemHandler };
const { studyHandler } = require("./study");
