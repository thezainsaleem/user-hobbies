const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");
const hobbySchema = require("./schema/hobby.schema.js");
const Schema = mongoose.Schema;
let HobbySchema = new Schema(hobbySchema);
HobbySchema.plugin(mongoosePaginate);
module.exports = mongoose.model("Hobby", HobbySchema);
