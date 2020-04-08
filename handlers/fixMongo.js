// const db = require("../config/db");
const inquirer = require("inquirer");
const Problem = require("../models/problems");
const mongoose = require("mongoose");
const { dbFunc } = require("../config/dbFunc");

const viewAll = async () => {
  dbFunc();
  const mongo_promise = await Problem.find();
  mongoose.connection.close();
  mongo_promise.forEach((problem) => {
    console.log(problem.title + " : " + problem.prompt);
  });
  fixMongo();
};

function fixMongo() {
  inquirer.prompt(mongoMenu).then((answer) => {
    if (answer.menuOptions == "View All") {
      viewAll();
    } else if (answer.menuOptions == "Exit") {
      return;
    } else if (answer.menuOptions == "View All 2") {
      viewAll2();
    }
  });
}

const mongoMenu = {
  type: "list",
  name: "menuOptions",
  message: "Main Menu > Fix Mongo",
  choices: ["View All", "View All 2", "Exit"],
};

module.exports = { fixMongo };
