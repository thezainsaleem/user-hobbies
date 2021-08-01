const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");
const Schema = mongoose.Schema;
let passionLevelValues = ["Low", "Medium", "High", "Very-High"];
let HobbySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  passionLevel: {
    type: String,
    required: true,
    enum: passionLevelValues
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
let hobbyModel = mongoose.model("Hobby", HobbySchema);
hobbyModel.passionLevelValues = passionLevelValues;
module.exports = hobbyModel;
