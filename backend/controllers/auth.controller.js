const { where } = require("sequelize");
const db = require("../models");
const bcrypt = require("bcrypt");
const { generateAccessToken, generateRefreshToken } = require("../utils/jwt");

const handleLogin = async (req, res) => {
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

    // const roles = Object.values(user.roles).filter(Boolean);
    const roles = user.roles ? user.roles.split(",").filter(Boolean) : [];

    const accessToken = generateAccessToken({
      username: user.username,
      roles: roles,
    });
    const refreshToken = generateRefreshToken({ username: user.username });

    user.refreshToken = refreshToken;
    await user.save();

    const username = user.username;

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({ roles, accessToken, username });
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: error.message });
  }
};

module.exports = { handleLogin };
