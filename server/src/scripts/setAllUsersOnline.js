const mongoose = require("mongoose");
const User = require("../models/User");
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/YOUR_DB_NAME_HERE";

mongoose.connect(MONGODB_URI)
  .then(async () => {
    await User.updateMany({}, { online: true });
    console.log("All users set to online!");
    mongoose.disconnect();
  })
  .catch((e) => {
    console.error(e);
    mongoose.disconnect();
  });