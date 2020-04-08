#!/usr/bin/env node
const inquirer = require("inquirer");
const { problemHandler } = require("./handlers/problems/index");
// const { fixMongo } = require("./handlers/fixMongo");

function main() {
  mainMenu();
}

const menuPrompt = {
  type: "list",
  name: "menuOptions",
  message: "Welcome to StudyBuddy.",
  choices: ["Problems", "Exit"],
};

// fix exit
const mainMenu = async () => {
  const answer = await inquirer.prompt(menuPrompt);
  console.log(answer);
  if (answer.menuOptions == "Exit") {
    return;
  }
  if (answer.menuOptions == "Problems") {
    problemHandler();
    // fixMongo();
  }
  //   inquirer.prompt(menuPrompt).then((answer) => {
  //     if (answer.menuOptions == "Exit") {
  //       res = true;
  //     }
  //     if (answer.menuOptions == "Problems") {
  //       problemHandler();
  //     }
  //   });
};

main();
