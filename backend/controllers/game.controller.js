const { where } = require("sequelize");
const { Op } = require("sequelize");
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
    const game = await db.Game.findByPk(gameId);
    if (game) {
      await db.Platform.destroy({ where: { gameID: gameId } });
      await db.Genre.destroy({ where: { gameID: gameId } });
      await game.destroy();
      res.status(200).json({ message: "Game deleted successfully" });
    } else {
      res.status(404).json({ error: "Game not found" });
    }
  } catch (error) {
    console.error(`Failed to delete game with id ${gameId}:`, error);
    res.status(500).json({ error: "Failed to delete game" });
  }
};

exports.editGame = async (req, res) => {
  const gameId = req.params.id;
  try {
    const game = await db.Game.findByPk(gameId, {
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
    console.error(`Failed to fetch game with id ${gameId}:`, error);
    res.status(500).json({ error: "Failed to fetch game" });
  }
};

exports.updateGame = async (req, res) => {
  const gameId = req.params.id;
  const {
    gameName,
    platform,
    genre,
    publisherName,
    releaseDate,
    price,
    salePrice,
    gameDescription,
  } = req.body;

  const gameImage = req.files["gameImage"]
    ? req.files["gameImage"][0].filename
    : null;
  const screenShots = req.files["screenShots"]
    ? req.files["screenShots"].map((file) => file.filename)
    : [];

  try {
    const game = await db.Game.findByPk(gameId);
    if (!game) {
      return res.status(404).json({ error: "Game not found" });
    }

    // Update game details
    await game.update({
      gameName,
      gameImage: gameImage || game.gameImage,
      publisherName,
      releaseDate,
      price,
      salePrice,
      gameDescription,
    });

    // Update screenshots: delete existing and add new ones
    if (screenShots.length > 0) {
      await db.GameScreenShots.destroy({ where: { gameID: gameId } });
      for (let screenShot of screenShots) {
        await db.GameScreenShots.create({
          screenShot,
          gameID: game.id,
        });
      }
    }

    // Update platforms: delete existing and add new ones
    if (platform) {
      const platformsArray = JSON.parse(platform);
      await db.Platform.destroy({ where: { gameID: gameId } });
      for (let slug of platformsArray) {
        await db.Platform.create({
          slug,
          gameID: game.id,
        });
      }
    }

    // Update genres: delete existing and add new ones
    if (genre) {
      const genreArray = JSON.parse(genre);
      await db.Genre.destroy({ where: { gameID: gameId } });
      for (let genreItem of genreArray) {
        await db.Genre.create({
          genreName: genreItem.name,
          slug: genreItem.slug,
          gameID: game.id,
        });
      }
    }

    res.status(200).json({ message: "Game updated successfully", game });
  } catch (error) {
    console.error(`Failed to update game with id ${gameId}:`, error);
    res.status(500).json({ error: "Failed to update game" });
  }
};

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
