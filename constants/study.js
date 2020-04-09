const studyMenu = {
  type: "list",
  name: "menuOptions",
  choices: ["View Notes", "View Solution", "Edit Notes", "Edit Solution"],
};

const rateProblem = {
  type: "list",
  message: "Rate problem difficulty",
  name: "rating",
  choices: ["Easy", "Medium", "Hard", "Back"],
};

module.exports = { studyMenu, rateProblem };
