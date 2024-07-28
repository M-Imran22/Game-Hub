const db = require("../models");
exports.getGameScreenShots = async (req, res) => {
  const gameId = req.params.id;
  try {
    const gameScreenShots = await db.GameScreenShots.findAll({
      where: { gameId: gameId },
    });
    if (gameScreenShots) {
      res.status(200).json(gameScreenShots);
    } else {
      res.status(404).json({ error: "Game not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch game" });
  }
};
