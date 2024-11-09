const express = require("express")
const dotenv = require("dotenv")
dotenv.config()
const app = express()
const mongoose = require("mongoose")
const MvcRoutesExport = require("./models/MvcRoutes")
const port = process.env.PORT
const methodOverride = require("method-override")
const morgan = require("morgan")
// GET /
app.get("/", async (req, res) => {
  const allMvc = await MvcRoutesExport.find()
  res.render("mvcEjs/index", { mvcEjs: allMvc })
})

// connect to db
mongoose.connect(process.env.MONGODB_URI)
// log if connected to db
mongoose.connection.on("connected", () => {
  console.log(
    `You are connected to db (${mongoose.connection.name}) successfully`
  )
})



// get form of MVC
app.get("/mvcEjs/new", (req, res) => {
  res.render("mvcEjs/new.ejs")
})
app.use(methodOverride("_method")) // new
app.get("/:mvcEjsId", async (req, res) => {
  const foundMvcEjs = await MvcRoutesExport.findById(req.params.mvcEjsId)
  res.render("mvcEjs/show", { mvcEjs: foundMvcEjs })
})
// Set EJS as the view engine
app.set("view engine", "ejs")
app.use(express.urlencoded({ extended: false }))
app.get("/mvcEjs/:mvcEjsId/edit", async (req, res) => {
  const foundMvcEjs = await MvcRoutesExport.findById(req.params.mvcEjsId)
  res.render("mvcEjs/edit.ejs", { mvc: foundMvcEjs })
})
// post form of MVC
app.post("/mvcEjs", async (req, res) => {
  if (req.body.isMvcRoute === "on") {
    req.body.isMvcRoute = true
  } else {
    req.body.isMvcRoute = false
  }
  await MvcRoutesExport.create(req.body)
  res.redirect("/")
})

app.get("/mvcEjs", async (req, res) => {
  const allMvc = await MvcRoutesExport.find()
  res.render("mvcEjs/index", { mvcEjs: allMvc })
})

app.delete("/mvcEjs/:mvcEjsId", async (req, res) => {
  await MvcRoutesExport.findByIdAndDelete(req.params.mvcEjsId)
  res.redirect("/")
})

app.put("/mvcEjs/:mvcEjsId", async (req,res)=>{
  if(req.body.isMvcRoute === "on"){
    req.body.isMvcRoute = true
  }else{
    req.body.isMvcRoute = false
  }
  await MvcRoutesExport.findByIdAndUpdate(req.params.mvcEjsId, req.body)
  res.redirect(`/${req.params.mvcEjsId}`)
})
app.use(morgan("dev"))
// run the server
app.listen(port, () => {
  console.log(`localhost:${port}`)
})
