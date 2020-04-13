#!/usr/bin/env node
const inquirer = require("inquirer");
const chalk = require("chalk");
const {
  create,
  list,
  retrieve,
  getRandom,
  destroy,
  destroyById,
} = require("../../config/db");
const {
  problemMenu,
  addQuestions,
  addNotes,
} = require("../../helpers/problems/problems");
const { mainHandler } = require("../index");

/*
addProblem
FIXME: ordering of addQuestions

DONE: DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead.
*/

const startRandom = async () => {
  const problem = await getRandom();
  console.log(problem);
  studyHandler(problem[0]);
};

const viewProblems = async () => {
  const problems = await list("Problem");
  if (problems.length === 0) {
    console.log("There are no problems.");
    problemHandler();
  }
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

const addProblem = async () => {
  const answers = await inquirer.prompt(addQuestions);
  // .then(() => inquirer.prompt(addNotes));
  // if (answers.solution) {
  //   const solution = await inquirer.prompt(addSolution);
  //   answers.solution = solution.solution;
  // }
  console.log(answers);
  const problem = await create(answers, "Problem");
  console.log("New Problem Added");
  console.log(problem);
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

const removeById = async () => {
  const answer = await inquirer.prompt([
    {
      type: "input",
      name: "id",
      message: "What problem do you want to remove?",
    },
  ]);
  const response = await destroyById(answer.id);
  console.log(response);
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
