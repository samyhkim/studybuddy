const chalk = require("chalk");
const { getThreeTitles } = require("../config/db");

// const getDeckMenu = async () => {
//   const titles = await getThreeRefactor();
//   const menu = titles.concat(["View All", "Add", "Remove", "Main Menu"]);
//   return menu;
// };

const deckMenu = async () => {
  console.log(2);
  const titles = await getThreeTitles();
  console.log(8);
  const menu = titles.concat(["View All", "Add", "Remove", "Main Menu"]);
  return {
    type: "list",
    name: "menuOptions",
    message: chalk.green.bold("Decks"),
    choices: menu,
  };
};

// const deckMenu = {
//   type: "list",
//   name: "menuOptions",
//   message: chalk.green.bold("Decks"),
//   choices: async () => {
//     const titles = await getThree();
//     const menu = titles.concat(["View All", "Add", "Remove", "Main Menu"]);
//     return menu;
//   },
// getDeckMenu(),
// async () => await getThreeRefactor(), //didnt work
// getThreeRefactor(),
// ["View All", "Add", "Remove", "Main Menu"],
//   async () => {
//   const titles = await getThree();
//   const menu = titles.concat(["View All", "Add", "Remove", "Main Menu"]);
//   return menu;
// },
// };

const addQuestions = [
  {
    type: "input",
    name: "title",
    message: "Deck title?",
  },
  {
    type: "input",
    name: "description",
    message: "Deck description?",
  },
];

module.exports = { deckMenu, addQuestions };
