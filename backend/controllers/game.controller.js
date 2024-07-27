const db = require("../models");
exports.getGame = async (req, res) => {
  const gameName = req.params.name;
  try {
    const game = await db.Game.findOne({
      where: { gameName: gameName },
      include: [
        { model: db.Platform, as: "platform" },
        { model: db.Genre, as: "genre" },
      ],
    });
    if (game) {
      res.status(200).json(game);
    } else {
      res.status(404).json({ error: "Game not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch game" });
  }
};
