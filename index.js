#!/usr/bin/env node
const { mainHandler } = require("./controllers/index");

/*
main
   |
   deck______________________
   |  |        |      |      |
   |  select   all    add    remove
   |  |
   |  start    all    add    remove
   |  |
   |  view sol          view note
   |  |                 |
   |  rate   edit sol   rate   edit note
   |
   problem___________________
   |  |        |      |      |
   |  select   all    add    remove
   |  |
   |  view sol          view note
   |  |                 |
   |  next   edit sol   next   edit note
   |
   exit
*/

function main() {
  mainHandler();
}

main();
