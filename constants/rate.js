const rateProblem = {
  type: "list",
  message: "Rate problem difficulty",
  name: "choice",
  choices: [
    { name: "Easy", value: 2 },
    { name: "Medium", value: 1 },
    { name: "Hard", value: 0 },
    "Back",
  ],
};

module.exports = { rateProblem };
