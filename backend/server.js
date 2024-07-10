const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const cors = require("cors");
const db = require("./models");

app.use(cors());
app.use(bodyparser.json());

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
