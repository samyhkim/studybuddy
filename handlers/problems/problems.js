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
const { mainHandler } = require("../index");

/*
viewProblems
FIXED: wire up startProblem() upon selection

addProblem
FIXED: open editor for prompt input
FIXME: ordering of addQuestions
*/

const startRandom = async () => {
  const problem = await getRandom();

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
  studyHandler(problem);
};

// get title and prompt
// ask for solution
// if yes, push to answers
// create(answers)
const addProblem = async () => {
  const answers = await inquirer.prompt(addQuestions);
  if (answers.solution) {
    const solution = await inquirer.prompt(addSolution);
    answers.solution = solution.solution;
  }
  const problem = await create(answers, "Problem");
  console.log("New Problem Added");
  console.log(problem.title);
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
    startRandom();
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

module.exports = { problemHandler };

const { studyHandler } = require("./study");
