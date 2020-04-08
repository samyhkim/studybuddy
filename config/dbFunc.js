const mongoose = require("mongoose");
const dbFunc = () => {
  mongoose.Promise = global.Promise;
  mongoose
    .connect("mongodb://localhost:27017/sb-cli", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .catch((err) => console.log(err));
};

module.exports = { dbFunc };
