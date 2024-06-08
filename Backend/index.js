require("dotenv").config({ path: "../.env" });
const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const SubjectRouter = require("./routes/SubjectRouter");
const authRouter = require("./routes/auth");
const mongoConnector = require("./connector");

app.use(express.static("public"));

const PORT = process.env.BPORT;
// const mongoURI = process.env.MONGODB_URI;
const mongoURI = process.env.ATLAS_MONGODB_URI;
// console.log(mongoURI);
mongoConnector(mongoURI);

//Middlewares
app.use(bodyParser.json());
app.use(cors());

app.get("/server_check", (req, res) => {
  res.send("<h1>SERVER IS RUNNING</h1>");
});

app.use("/api", SubjectRouter);
app.use("/auth", authRouter);

app.listen(PORT, () => {
  console.log(`Listening at port ${PORT}....`);
});
