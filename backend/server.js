const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const cors = require("cors");
const db = require("./models");
const gameRouter = require("./routes/games.routes");
const genreRouter = require("./routes/genres.routes");
const platformRouter = require("./routes/platforms.routes");
const path = require("path");

app.use(cors());
app.use(bodyparser.json());
app.use("/uploads", express.static("uploads"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/games", gameRouter);
app.use("/api/genres", genreRouter);
app.use("/api/platforms", platformRouter);

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
