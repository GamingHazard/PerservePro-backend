const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const User = require("../models/users");

router.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send("Email already exists");
    }
    const newUser = new User({
      email,
      password,
    });
    await newUser.save();
    const token = newUser.generateAuthToken();
    res.status(201).send({ user: newUser, token });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.authenticate(email, password);
    if (!user) {
      return res.status(401).send("Invalid email or password");
    }
    const token = user.generateAuthToken();
    res.send({ user, token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/forgot-password", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).send("User not found");
    }
    const token = user.generateResetToken();
    await user.save();

    const transporter = nodemailer.createTransport({
      // Configure Email transporter
    });

    const mailOptions = {
      to: user.email,
      subject: "Password Reset",
      text: `To reset your password, please click on the following link: ${req.headers.host}/reset-password/${token}`,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error("Error sending Email:", err);
        return res.status(500).send("Error sending Email");
      }
      console.log("Email sent:", info.response);
      res.send("Email sent");
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
});

router.post("/reset-password/:token", async (req, res) => {
  try {
    const user = await User.findOne({
      resetPasswordToken: req.params.token,
      resetPasswordExpires: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(404).send("Invalid or expired token");
    }
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();
    res.send("Password reset successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
