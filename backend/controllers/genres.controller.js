const db = require("../models");

exports.getAllGenres = async (req, res) => {
  try {
    const genres = await db.Genre.findAll({
      attributes: ["id", "genreName", "slug", "createdAt", "updatedAt"],
      group: ["genreName"],
    });
    res.status(200).json(genres);
  } catch (err) {
    res.status(500).json(err);
  }
};
