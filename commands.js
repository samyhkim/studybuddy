#!/usr/bin/env node
const program = require("commander");
const { prompt } = require("inquirer");
// const { addDeck, findDeck } = require("./handlers/decks");
const { addProblem } = require("./handlers/problems");

program.version("1.0.0").description("Spaced repetition studying.");

program
  .command("add <title> <description>")
  .alias("a")
  .description("Add a deck.")
  .action((title, description) => {
    addDeck({ title, description });
  });

program
  .command("find <title>")
  .alias("f")
  .description("Find a deck.")
  .action((title) => {
    findDeck(title);
  });

program.parse(process.argv);
