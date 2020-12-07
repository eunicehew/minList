const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, unique: true, required: true },
  passwordHash: { type: String, required: true },
  createdDate: { type: Date, default: Date.now },
  pages: [{ type: Schema.Types.ObjectId, ref: "Page" }],
});

UserSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (ret) {
    delete ret._id;
    delete ret.passwordHash;
  },
});

module.exports = mongoose.model("User", UserSchema);
