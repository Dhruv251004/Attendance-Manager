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
const mongoURI = process.env.MONGODB_URI;
mongoConnector(mongoURI);

//Middlewares
app.use(bodyParser.json());
app.use(cors());
app.use("/api", SubjectRouter);
app.use("/auth", authRouter);

app.listen(PORT, () => {
  console.log(`Listening at port ${PORT}....`);
});
