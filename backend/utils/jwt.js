require("dotenv").config();

const jwt = require("jsonwebtoken");
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

const generateAccessToken = (username, roles) => {
  return jwt.sign({ userInfo: { username, roles } }, ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
};
const generateRefreshToken = (username) => {
  return jwt.sign(username, REFRESH_TOKEN_SECRET, { expiresIn: "1d" });
};

const verifyAccessToken = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader?.startsWith("Bearer"))
    return res.status(401).json({ message: "Unauthorized" });
  const token = authHeader.split(" ")[1];

  jwt.verify(token, ACCESS_TOKEN_SECRET, (error, decode) => {
    if (error) return res.status(403).json({ message: "Forbidden" });
    req.username = decode.userInfo.username;
    req.roles = decode.userInfo.roles;
    next();
  });
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
};
