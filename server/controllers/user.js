const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendEmail = require("../Utilities/sendEmail");

const signup = (req, res) => {
  const { username, email, password } = req.body;

  User.findOne({ email: req.body.email }).exec(async (error, user) => {
    if (user) {
      res.status(400).json({
        message: "User already exist!",
      });
    }

    if (!error && !user) {

      const _user = new User({
        username,
        email,
        password,
      });

      const users = await _user.save();

      return res.status(200).json({ users });
    }
  });
};

const login = (req, res) => {
  User.findOne({ email: req.body.email }).exec((error, user) => {
    if (error)
      return res.status(400).json({ message: "Something went error!" });
    if (user && user.authenticate(req.body.password)) {
      const userObject = {
        userId: user._id,
        username: user.username,
        email: user.email,
        token: user.token,
      };
      const token = jwt.sign(userObject, process.env.JWT_SECRET);

      res
        .cookie(process.env.COOKIES_NAME, token, {
          maxAge: process.env.JWT_EXPIRY,
          httpOnly: true,
          signed: true,
        })
        .json({
          message: "Login successful!",
          user,
        });
    } else {
      res.status(400).json({ message: "Password Incorrect" });
    }
  });
};

const loggedIn = (req, res) => {
  const token = req.signedCookies[process.env.COOKIES_NAME];

  if (!token) return res.json({ message: "Token not found!" });
  const user = jwt.verify(token, process.env.JWT_SECRET);
  req.user = user;
  res.status(200).json({ success: true, user });
};

const getAllUser = (req, res) => {
  User.find().exec((err, users) => {
    if (err) return res.status(400).json({ message: "Something went error!" });
    if (users) {
      res.status(200).json(users);
    }
  });
};

const signout = (req, res) => {
  res.status(200).clearCookie(process.env.COOKIES_NAME).json({
    message: "Signout success!",
  });
};

// send email for update email

const sendResetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ message: "user not found" });
    }
    const token = jwt.sign({ user }, process.env.JWT_SECRET);
    console.log(token);

    const resetPasswordUrl = `http://localhost:3000/reset-password/${token}`;
    const text = `
      <p>Dear ${user.username},</p>
      <br />
      <p>There was a request to change you Email</p>
      <h5>${resetPasswordUrl}</h5>
      `;
    const subject = "Reset Password";
    const mailInfo = await sendEmail(email, subject, text);
    user.token = token;
    await user.save();
    console.log(user);
    return res.status(200).send({ msg: "success" });
  } catch (error) {
    console.log(error);
  }
};

// for password reset
const resetPassword = async (req, res) => {
  try {
    const password = req.body.password;
    const token = req.params.token;
    let user = await User.findOneAndUpdate({ token });
    if (!user) {
      res.status(400).json({ message: "user not found" });
    }
    // change to password
    user.password = password;
    await user.save();
    res.status(200).send({ message: "Password reset" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "failed to change password" });
  }
};

module.exports = {
  login,
  signup,
  loggedIn,
  signout,
  getAllUser,
  sendResetPassword,
  resetPassword,
};
