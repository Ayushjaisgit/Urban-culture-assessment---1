require("dotenv").config({ path: ".env" });
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const Port = process.env.PORT || 3000;
const userRouter = require("./routes/user.route");
require("./db");

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api", userRouter);

app.listen(Port, () => {
  console.log(`Server Started At Port - ${Port}`);
});
