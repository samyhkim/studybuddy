#!/usr/bin/env node
const inquirer = require("inquirer");
const chalk = require("chalk");
const {
  create,
  list,
  retrieve,
  getRandom,
  destroy,
} = require("../../config/db");
const {
  problemMenu,
  addQuestions,
  addSolution,
} = require("../../constants/problems/problems");
// const { studyHandler } = require("./study");
const { mainHandler } = require("../index");

/*
startProblem
TODO: set timer

removeProblem
TODO: maybe remove multiple?
*/

const startProblem = async () => {
  const problem = await getRandom();
  console.log(problem[0].title);
  console.log(problem[0].prompt);

  studyHandler(problem[0]);
};

const viewProblems = async () => {
  const problems = await list("Problem");
  const answer = await inquirer.prompt([
    {
      type: "list",
      name: "title",
      choices: problems,
    },
  ]);
  const problem = await retrieve(answer.title, "Problem");
  console.log(chalk.bold.yellow(problem.title));
  console.log(chalk.black.bgWhite(problem.prompt));

  problemHandler();
};

const addProblem = async () => {
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

const removeProblem = async () => {
  const problems = await list("Problem");
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
    const response = await destroy(answer.title, "Problem");
    console.log(response);
  }
  problemHandler();
};

const problemHandler = async () => {
  const answer = await inquirer.prompt(problemMenu);
  if (answer.menuOptions == "Start") {
    startProblem();
  } else if (answer.menuOptions == "View All") {
    viewProblems();
  } else if (answer.menuOptions == "Add") {
    addProblem();
  } else if (answer.menuOptions == "Remove") {
    removeProblem();
  } else if (answer.menuOptions == "Main Menu") {
    mainHandler();
  }
};

module.exports = { problemHandler, startProblem };

const { studyHandler } = require("./study");
