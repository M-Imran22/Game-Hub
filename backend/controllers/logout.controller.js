require("dotenv").config();

const db = require("../models");
const jwt = require("jsonwebtoken");
const { generateAccessToken } = require("../utils/jwt");

const handleLogout = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204);
  const refreshToken = cookies.jwt;

  const foundUser = await db.User.findOne({
    where: { refreshToken: refreshToken },
  });
  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true, maxage: 24 * 60 * 60 * 1000 });
    return res.sendStatus(204);
  }

  foundUser.refreshToken = " ";
  await foundUser.save();

  res.clearCookie("jwt", { httpOnly: true, maxage: 24 * 60 * 60 * 1000 });
  res.sendStatus(204);
};

module.exports = { handleLogout };
