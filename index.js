const startupDebugger = require("debug")("app:startup");
const dbDebugger = require("debug")("app:db");
const config = require("config");
const Joi = require("joi");
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const logger = require("./middleware/logger");
const courses = require("./routes/courses");
const home = require("./routes/home");
const auth = require("./auth");
const app = express();

app.set("view engine", "pug");
app.set("views", "./views");

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(helmet());
app.use("/api/courses", courses);
app.use("/", home);

console.log(config.get("mail.host"));

if(app.get("env") === "development") {
  app.use(morgan("tiny"));
  startupDebugger("Morgan enabled.");
}

//Db work
dbDebugger("Connected to database...");

app.use(logger);

app.use(auth);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Listening in port " + port));