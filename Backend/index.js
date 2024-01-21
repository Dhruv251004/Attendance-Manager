const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const SubjectRouter = require("./routes/SubjectRouter");
const authRouter = require("./routes/auth");
const mongoConnector = require("./connector");
mongoConnector();
//Middlewares
app.use(bodyParser.json());
app.use(cors());
app.use("/api", SubjectRouter);
app.use("/auth", authRouter);

app.listen(5000, () => {
  console.log("Listening at port 5000....");
});
