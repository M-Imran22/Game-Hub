require("dotenv").config();

const db = require("../models");
const jwt = require("jsonwebtoken");
const { generateAccessToken } = require("../utils/jwt");

const handlerefreshToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  console.log(cookies.jwt);
  const refreshToken = cookies.jwt;

  const foundUser = await db.User.findOne({
    where: { refreshToken: refreshToken },
  });
  console.log(foundUser.username);
  if (!foundUser) return res.sendStatus(403);

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    (error, decode) => {
      if (error || foundUser.username !== decode.username)
        return res.status(403).json({ message: "Forbidden" });

      const roles = Object.values(foundUser.roles);
      const accessToken = generateAccessToken({
        username: foundUser.username,
        roles: roles,
      });
      res.json({ accessToken });
    }
  );
};

module.exports = { handlerefreshToken };
