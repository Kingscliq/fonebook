const mongoose = require("mongoose");

const config = require("config");
const db = config.get("MongoURI");

const connectDB = () => {
  mongoose
    .connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    .then(() => console.log("Database Connected..."))
    .catch((err) => {
      console.log(err);
      process.exit(1);
    });
};

module.exports = connectDB;
