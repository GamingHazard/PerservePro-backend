const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    contacts: { type: String, required: true },
    region: { type: String, required: true },
    FarmName: { type: String, required: true },
    image: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Profile", ProfileSchema);
