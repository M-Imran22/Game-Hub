const db = require("../models");

exports.getAllOptions = async (req, res) => {
  try {
    const sysReqTypes = await db.System_requirement_types.findAll({
      include: [
        {
          model: db.System_requirement_options,
          as: "options",
        },
      ],
    });
    res.status(200).json(sysReqTypes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
