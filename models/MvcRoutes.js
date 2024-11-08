const mongoose = require("mongoose");
const mvcRoutesSchema = new mongoose.Schema({
  name: String,
  isMvcRoute: Boolean,
});

const MvcRoutesExport = mongoose.model("MvcRoutesExport", mvcRoutesSchema);
module.exports = MvcRoutesExport;
