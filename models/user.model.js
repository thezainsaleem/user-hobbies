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
// UserSchema.pre('deleteOne', function(next) {
//   console.log("USER DELETED", this._id)
  
//   Hobby.deleteMany({
//     _id: {
//       $in: this.hobbies
//     }
//   });
// });

UserSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("User", UserSchema);
