require("dotenv").config();

const { where } = require("sequelize");
const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const TOKEN_SECRET_KEY = process.env.TOKEN_SECRET_KEY;

const generateToken = (user) => {
  jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    TOKEN_SECRET_KEY,
    {
      expiresIn: "1h",
    }
  );
};

exports.addUser = async (req, res) => {
  const { username, email, password, role } = req.body;
  const hashPassword = await bcrypt.hash(password, 10);

  await db.User.create({
    username,
    email,
    password: hashPassword,
    role: role,
  });

  res.status(200).send("User added");
};

exports.getUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = db.User.findOne({ where: { email } });
    if (!user) {
      res.status(401).json({ message: "Invalid credentionals!" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({
        message: "Invalid credentionals",
      });
    }

    const token = generateToken(user)(
      // console.log(token);

      (req.session.token = token)
    );

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Error login", error });
  }
};

const authToken = async (req, res, next) => {
  const token = req.session.token;
  if (token) {
    jwt.verify(token, TOKEN_SECRET_KEY, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

const authorizeRole = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.sendStatus(403);
    }
    next();
  };
};

exports.getAdmin =
  (authToken,
  authorizeRole("admin"),
  (req, res) => {
    res.json({ message: "Welcom Admin" });
  });
exports.getUser =
  (authToken,
  authorizeRole("user"),
  (req, res) => {
    res.json({ message: "Welcom User" });
  });
