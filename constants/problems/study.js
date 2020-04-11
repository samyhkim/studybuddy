const studyMenu = {
  type: "list",
  name: "menuOptions",
  choices: [
    "View Notes",
    "View Solution",
    "Edit Notes",
    "Edit Solution",
    "Back",
  ],
};

const nextProblem = {
  type: "list",
  message: "Next problem?",
  name: "choice",
  choices: ["Next", "Back"],
};

module.exports = { studyMenu, nextProblem };
