const { where } = require("sequelize");
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

exports.destroyGame = async (req, res) => {
  const gameId = req.params.id;
  try {
    console.log(`Attempting to delete game with id ${gameId}`);
    const game = await db.Game.findByPk(gameId);
    if (game) {
      await db.Platform.destroy({ where: { gameID: gameId } });
      await db.Genre.destroy({ where: { gameID: gameId } });
      await game.destroy();
      console.log("Game deleted successfully");
      res.status(200).json({ message: "Game deleted successfully" });
    } else {
      console.log("Game not found");
      res.status(404).json({ error: "Game not found" });
    }
  } catch (error) {
    console.error(`Failed to delete game with id ${gameId}:`, error);
    res.status(500).json({ error: "Failed to delete game" });
  }
};
