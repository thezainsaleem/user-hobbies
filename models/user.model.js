const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");
const Schema = mongoose.Schema;
let UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    hobbies: [{
      ref: "Hobby",
      type: Schema.Types.ObjectId
    }]
  },
  {
    timestamps: true
  }
);

UserSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("User", UserSchema);
