const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const mongoose = require("mongoose");
const port = process.env.PORT;

// GET /
app.get("/", async (req, res) => {
  res.render("mvcEjs/index.ejs");
});

// connect to db
mongoose.connect(process.env.MONGODB_URI);
// log if connected to db
mongoose.connection.on("connected", () => {
  console.log(
    `You are connected to db (${mongoose.connection.name}) successfully`
  );
});

const MvcRoutesExport = require("./models/MvcRoutes");

// get form of MVC
app.get("/mvcEjs/new", (req, res) => {
  res.render("mvcEjs/new.ejs");
});
// Set EJS as the view engine
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

// post form of MVC
app.post("/mvcEjs", async (req, res) => {
  if (req.body.isMvcRoute === "on") {
    req.body.isMvcRoute = true;
  } else {
    req.body.isMvcRoute = false;
  }
  await MvcRoutesExport.create(req.body);
  res.render("mvcEjs/new");
});

app.get("/mvcEjs", async (req, res) => {
  const allMvc = await MvcRoutesExport.find();
  res.render("mvcEjs/index.ejs", { mvcEjs: allMvc });
});

// run the server
app.listen(port, () => {
  console.log(`localhost:${port}`);
});
