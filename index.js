#!/usr/bin/env node
const inquirer = require("inquirer");
// const { addDeck, findDeck } = require("./handlers/decks");
const { problemHandler, addProblem } = require("./handlers/problems");

function main() {
  mainMenu();
}

const menuPrompt = {
  type: "list",
  name: "menuOptions",
  message: "Welcome to StudyBuddy.",
  choices: ["Problems", "Exit"],
};

function mainMenu() {
  inquirer.prompt(menuPrompt).then((answer) => {
    if (answer.menuOptions == "Exit") {
      return;
    }
    if (answer.menuOptions == "Problems") {
      problemHandler();
    }
  });
}

main();
