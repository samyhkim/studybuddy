#!/usr/bin/env node

// db not closing properly

const { dbConnect } = require("../../config/db");
const inquirer = require("inquirer");
const Problem = require("../../models/problems");
const mongoose = require("mongoose");

const retrieveProblem = async () => {
  dbConnect();
  const mongo_promise = await Problem.aggregate([{ $sample: { size: 1 } }]);
  mongoose.connection.close();
  //   console.log(mongo_promise);
  inquirer
    .prompt([
      {
        type: "list",
        name: "menuOptions",
        choices: ["View Notes", "View Solution", "Exit"],
      },
    ])
    .then((answer) => {
      if (answer.menuOptions == "View Notes") {
        viewNotes();
      } else if (answer.menuOptions == "View Solution") {
        viewSolution();
      } else if (answer.menuOptions == "Edit Notes") {
        editNotes();
      } else if (answer.menuOptions == "Edit Solution") {
        editSolution();
      }
    });
};

// allow to traverse through list and start from any
const viewProblems = async () => {
  dbConnect();
  const mongo_promise = await Problem.find();
  mongoose.connection.close();

  mongo_promise.forEach((problem) => {
    console.log(problem.title + " : " + problem.prompt);
  });

  problemHandler();
};

// add notes
// add solution
// add difficulty
// add related questions
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
];

const addProblem = async () => {
  dbConnect();
  const answers = await inquirer.prompt(addQuestions);
  const mongo_promise = await Problem.create(answers);
  mongoose.connection.close();

  console.log("New Problem Added");
  console.log(mongo_promise.title);
  console.log(mongo_promise.prompt);

  problemHandler();
};

// fix mongo remove
// ask to confirm
const removeProblem = async () => {
  dbConnect();
  const mongo_promise = await Problem.find();
  problems = [];
  // mongoose.connection.close();
  mongo_promise.forEach((problem) => {
    problems.push(problem.title);
  });
  inquirer
    .prompt([
      {
        type: "list",
        name: "title",
        message: "What problem do you want to remove?",
        choices: problems,
      },
    ])
    .then((answer) => {
      console.log(answer);
      Problem.remove({ _title: answer.title });
      mongoose.connection.close();
    });
};

// fix back - maybe async from index?
function problemHandler() {
  inquirer.prompt(problemMenu).then((answer) => {
    if (answer.menuOptions == "Start") {
      retrieveProblem();
    } else if (answer.menuOptions == "View All") {
      viewProblems();
    } else if (answer.menuOptions == "Add") {
      addProblem();
    } else if (answer.menuOptions == "Remove") {
      removeProblem();
    } else if (answer.menuOptions == "< Main Menu") {
      console.log(answer);
    } else if (answer.menuOptions == "Exit") {
      return;
    }
  });
}

const problemMenu = {
  type: "list",
  name: "menuOptions",
  message: "Main Menu > Problems",
  choices: ["Start", "View All", "Add", "Remove", "< Main Menu", "Exit"],
};

module.exports = { problemHandler };
