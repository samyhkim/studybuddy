#!/usr/bin/env node
const inquirer = require("inquirer");
const { mainMenu } = require("./constants/index");
const { problemHandler } = require("./handlers/problem");

function main() {
  mainHandler();
}

const mainHandler = async () => {
  const answer = await inquirer.prompt(mainMenu);
  if (answer.menuOptions == "💡 Problems") {
    problemHandler();
  } else if (answer.menuOptions == "Exit") {
    return;
  }
};

main();
