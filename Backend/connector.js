const mongoose = require("mongoose");


const connectToMongo = async (mongoURI) => {
  await mongoose.connect(mongoURI);
  console.log("Connected to MongoDb");
};

module.exports = connectToMongo;
