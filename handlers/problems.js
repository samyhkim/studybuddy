const db = require("../config/db");
const inquirer = require("inquirer");
const Problem = require("../models/problems");

const retrieveProblem = async () => {
  const mongo_promise = await Problem.aggregate([{ $sample: { size: 1 } }]);
  db.connection.close();
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
  const mongo_promise = await Problem.find();
  db.connection.close();
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
    message: "Problem title.",
  },
  {
    type: "input",
    name: "prompt",
    message: "Problem prompt",
  },
];

// create problem - fix to async await!
const addProblem = () => {
  inquirer.prompt(addQuestions).then((answers) => {
    Problem.create(answers).then((mongo_promise) => {
      console.log("New Problem Added");
      console.log(mongo_promise.title);
      console.log(mongo_promise.prompt);
      db.connection.close();
    });
    problemHandler();
  });
};

// fix mongo remove
// ask to confirm
const removeProblem = async () => {
  const mongo_promise = await Problem.find();
  problems = [];
  db.connection.close();
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
      db.connection.close();
    });
};

const problemMenu = {
  type: "list",
  name: "menuOptions",
  message: "Main Menu > Problems",
  choices: ["Start", "View All", "Add", "Remove", "< Main Menu", "Exit"],
};

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
    }
  });
}

module.exports = { problemHandler, addProblem };
