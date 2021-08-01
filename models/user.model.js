const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");
const userSchema = require("./schema/user.schema.js");
const Schema = mongoose.Schema;
let UserSchema = new Schema(userSchema, {timestamps: true});
UserSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("User", UserSchema);
