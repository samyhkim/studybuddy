#!/usr/bin/env node
const { mainHandler } = require("./controllers/index");

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

main();
