const mongoose = require('mongoose');
const mongoURI = "mongodb://0.0.0.0:27017/attendanceManager"; 

const connectToMongo = () => {
    mongoose.connect(mongoURI)
    console.log("Connected to MongoDb")
}

module.exports = connectToMongo;
