const db = require("../models");

exports.createNewGame = async (req, res) => {
  try {
    const { gameName, platform } = req.body;
    const gameImage = req.file ? req.file.filename : null;

    const newGame = await db.Game.create({ gameName, gameImage });

    const platformsArray = JSON.parse(platform);

    for (let slug of platformsArray) {
      const platformInstance = await db.Platform.create({
        slug,
        gameID: newGame.id,
      });
    }

    res.status(200).send("Game info saved successfully");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllGames = async (req, res) => {
  try {
    const games = await db.Game.findAll({
      include: [
        {
          model: db.Platform,
          as: "platform",
        },
      ],
    });
    res.status(200).json(games);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch games" });
  }
};
