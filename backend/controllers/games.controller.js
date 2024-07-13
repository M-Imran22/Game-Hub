const { Op, where } = require("sequelize");
const db = require("../models");

exports.createNewGame = async (req, res) => {
  try {
    const { gameName, platform, genre } = req.body;
    const gameImage = req.file ? req.file.filename : null;

    const newGame = await db.Game.create({ gameName, gameImage });

    const platformsArray = JSON.parse(platform);

    for (let slug of platformsArray) {
      const platformInstance = await db.Platform.create({
        slug,
        gameID: newGame.id,
      });
    }
    const genreArray = JSON.parse(genre);

    for (let genre of genreArray) {
      const genreName = genre.name;
      const slug = genre.slug;

      const genreInstance = await db.Genre.create({
        genreName,
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
  const { search } = req.query;
  try {
    const whereConditions = {};
    if (search) {
      whereConditions.gameName = {
        [Op.like]: `%${search}%`,
      };
    }

    const games = await db.Game.findAll({
      where: whereConditions,

      include: [
        {
          model: db.Platform,
          as: "platform",
        },
        {
          model: db.Genre,
          as: "genre",
        },
      ],
    });
    res.status(200).json(games);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch games" });
  }
};
