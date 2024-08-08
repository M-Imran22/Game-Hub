const { where } = require("sequelize");
const db = require("../models");
const bcrypt = require("bcrypt");
const { generateAccessToken, generateRefreshToken } = require("../utils/jwt");

exports.signup = async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    const hashPwd = await bcrypt.hash(password, 10);
    const user = await db.User.create({
      username,
      email,
      password: hashPwd,
      role,
    });

    res.status(201).json({ message: "User added" });
  } catch (error) {
    console.log(error);

    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await db.User.findOne({ where: { email } });
    if (!user) {
      console.log("incorrect email");
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log("incorrect password");
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const accessToken = generateAccessToken({ id: user.id });
    const refreshToken = generateRefreshToken({ id: user.id });

    res.json({ accessToken, refreshToken });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};
