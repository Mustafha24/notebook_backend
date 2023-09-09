const { UserModel } = require("../MODELS/User");
const env = require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  let user = await UserModel.findOne({ email: req.body.email });
  let success = false;
  try {
    if (user) {
      success=false;
      return res.status(400).json({
        success,
        status: "fail",
        message: "user already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const secure_pass = await bcrypt.hash(req.body.password, salt);
    user = await UserModel.create({
      name: req.body.name,
      email: req.body.email,
      password: secure_pass,
    });
    const data = {
      id: user.id,
    };
    const authToken = jwt.sign(data, process.env.JWT_SECRET);
    success=true
    res.status(200).json({ success, user });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "something went wrong",
    });
  }
};

const login = async (req, res) => {
  let success = false;
  const { email, password } = req.body;
  let user = await UserModel.findOne({ email: email });
  try {
    if (!user) {
      success = false;
      return res.status(400).json({
        message: "User is not registered",
      });
    }

    const pass_compare = await bcrypt.compare(password, user.password);
    if (!pass_compare) {
      return res.status(400).json({
        message: "Wrong Password",
      });
    }

    const payload = {
      id: user.id,
    };
    const authToken = jwt.sign(payload, process.env.JWT_SECRET);
    success = true;
    res.json({
      success,
      authToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "something went wrong",
    });
  }
};

const details = async (req, res) => {
  try {
    const userid = req.user.id;
    const details = await UserModel.findById(userid).select("-password");
    res.status(200).json({
      data: details,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

module.exports = { register, login, details };
