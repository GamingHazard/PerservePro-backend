const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
});

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 10);
  }
  next();
});

userSchema.statics.authenticate = async function (email, password) {
  const user = await this.findOne({ email });
  if (!user) {
    return null; // Return null instead of throwing error
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return null; // Return null instead of throwing error
  }
  return user;
};

userSchema.methods.generateAuthToken = function () {
  return jwt.sign({ _id: this._id }, "your_secret_key", {
    expiresIn: "1h",
  });
};

userSchema.methods.generateResetToken = function () {
  const token = jwt.sign({ _id: this._id }, "your_secret_key", {
    expiresIn: "1h",
  });
  this.resetPasswordToken = token;
  this.resetPasswordExpires = Date.now() + 3600000; // 1 hour
  return token;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
