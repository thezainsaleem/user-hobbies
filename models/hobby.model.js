const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");
const hobbySchema = require("./schema/hobby.schema.js");
const Schema = mongoose.Schema;
let HobbySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  passionLevel: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    trim: true,
    required: true,
    maxlength: 4,
    minlength: 4
  }
},{
  timestamps: true
});
HobbySchema.plugin(mongoosePaginate);
module.exports = mongoose.model("Hobby", HobbySchema);
