#!/usr/bin/env node
const inquirer = require("inquirer");
const { mainMenu } = require("./constants/index");
const { deckHandler } = require("./handlers/decks");
const { problemHandler } = require("./handlers/problems");

/*
index
    |
    deck______________________
    |  |        |      |      |
    |  select   all    add    remove
    |  |
    |  start    all    add    remove
    |  |
    |  view sol   view note   edit sol   edit note
    |  |          |
    |  rate       rate
    |  |          |
    |  next       next
    |
    problem___________________
    |  |        |      |      |
    |  select   all    add    remove
    |  |
    |  view sol   view note   edit sol   edit note
    |  |          |
    |  next       next
*/

function main() {
  mainHandler();
}

const mainHandler = async () => {
  const answer = await inquirer.prompt(mainMenu);
  if (answer.menuOptions == "📚 Decks") {
    deckHandler();
  } else if (answer.menuOptions == "💡 Problems") {
    problemHandler();
  } else if (answer.menuOptions == "Exit") {
    return;
  }
};

main();
