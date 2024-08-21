const { where } = require("sequelize");
const { Op } = require("sequelize");
const db = require("../models");

exports.getGame = async (req, res) => {
  const gameName = req.params.name;
  try {
    const game = await db.Game.findOne({
      where: { gameName: gameName },
      include: [
        { model: db.Platform, as: "platforms" },
        { model: db.Genre, as: "genres" },
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
        { model: db.Platform, as: "platforms" },
        { model: db.Genre, as: "genres" },
        { model: db.GameScreenShots, as: "screenshots" },
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

  const gameImage = req.files?.gameImage
    ? req.files["gameImage"][0].filename
    : null;
  const screenShots = req.files?.screenShots
    ? req.files["screenShots"].map((file) => file.filename)
    : [];

  const transaction = await db.sequelize.transaction();

  try {
    const game = await db.Game.findByPk(gameId);
    if (!game) {
      return res.status(404).json({ error: "Game not found" });
    }

    // Prepare an update object, only adding fields that are provided in req.body
    const updatedFields = {
      gameName: gameName || game.gameName,
      gameImage: gameImage || game.gameImage,
      publisherName: publisherName || game.publisherName,
      releaseDate: releaseDate || game.releaseDate,
      price: price !== undefined ? price : game.price,
      salePrice: salePrice !== undefined ? salePrice : game.salePrice,
      gameDescription: gameDescription || game.gameDescription,
    };

    // Update game details
    await game.update(updatedFields, { transaction });

    // Update screenshots only if new screenshots are provided
    if (screenShots.length > 0) {
      await db.GameScreenShots.destroy({
        where: { gameID: gameId },
        transaction,
      });
      for (let screenShot of screenShots) {
        await db.GameScreenShots.create(
          {
            screenShot,
            gameID: game.id,
          },
          { transaction }
        );
      }
    }

    // Update platforms only if new platforms are provided
    if (platform) {
      const platformsArray = JSON.parse(platform);
      await db.Platform.destroy({ where: { gameID: gameId }, transaction });
      for (let slug of platformsArray) {
        await db.Platform.create(
          {
            slug,
            gameID: game.id,
          },
          { transaction }
        );
      }
    }

    // Update genres only if new genres are provided
    if (genre) {
      const genreArray = JSON.parse(genre);
      await db.Genre.destroy({ where: { gameID: gameId }, transaction });
      for (let genreItem of genreArray) {
        await db.Genre.create(
          {
            genreName: genreItem.name,
            slug: genreItem.slug,
            gameID: game.id,
          },
          { transaction }
        );
      }
    }

    // Commit transaction if everything is successful
    await transaction.commit();
    console.log("Game updated successfully");
    res.status(200).json({ message: "Game updated successfully", game });
  } catch (error) {
    // Rollback transaction in case of failure
    console.error(`Failed to update game with id ${gameId}:`, error);
    await transaction.rollback();
    res.status(500).json({ error: "Failed to update game" });
  }
};

exports.getGameScreenShots = async (req, res) => {
  const gameId = req.params.id;
  try {
    const gameScreenShots = await db.GameScreenShots.findAll({
      where: { gameID: gameId },
    });
    if (gameScreenShots) {
      res.status(200).json(gameScreenShots);
    } else {
      res.status(404).json({ error: "Game not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch gameScreenShots" });
  }
};
