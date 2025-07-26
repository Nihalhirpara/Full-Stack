const mongoose = require("mongoose");

const mongouri = process.env.MONGO_URI;

mongoose
  .connect(mongouri)
  .then(() => {
    console.log("Database Connected Successfully");
  })
  .catch(() => {
    console.error("failed to Connect Database");
  });
