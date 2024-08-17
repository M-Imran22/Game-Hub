const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const db = require("./models");
const gamesRouter = require("./routes/games.routes");
const gameRouter = require("./routes/game.routes");
// const sysReqOptionsRouter = require("./routes/sys_req_options.routes");
const registerRoutes = require("./routes/api/register.routes");
const authRoutes = require("./routes/api/auth.routes");
const refreshTokenRoutes = require("./routes/api/refreshToken.routes");
const logoutRoutes = require("./routes/api/logout.routes");
const path = require("path");

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(bodyparser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/games", gamesRouter);
app.use("/api/register", registerRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/refresh", refreshTokenRoutes);
app.use("/api/logout", logoutRoutes);

app.use("/api/game", gameRouter);
// app.use("/api/sys_req_options", sysReqOptionsRouter);

db.sequelize
  .sync()
  .then(() => {
    app.listen(3001, () => {
      console.log("Server running on port 3001");
    });
  })
  .catch((err) => {
    console.log(err);
  });
