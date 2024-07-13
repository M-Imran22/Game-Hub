const db = require("../models");

exports.getAllPlatforms = async (req, res) => {
  try {
    const platforms = await db.Platform.findAll({
      group: ["slug"],
    });
    res.status(200).json(platforms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
