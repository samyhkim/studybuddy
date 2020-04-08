const mongoose = require("mongoose");

const dbConnect = () => {
  mongoose.Promise = global.Promise;
  mongoose
    .connect("mongodb://localhost:27017/sb-cli", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .catch((err) => console.log(err));
};

module.exports = { dbConnect };
