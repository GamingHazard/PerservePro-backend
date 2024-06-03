const mongoose = require("mongoose");
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

// Remove the password hashing middleware
userSchema.pre("save", function (next) {
  next();
});

// Simplify the authenticate method to compare plain text passwords
userSchema.statics.authenticate = async function (email, password) {
  const user = await this.findOne({ email, password });
  if (!user) {
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
