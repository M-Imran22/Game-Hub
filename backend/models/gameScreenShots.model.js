module.exports = (sequelize, DataTypes) => {
  const GameScreenShots = sequelize.define("GameScreenShots", {
    screenShot: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gameID: {
      type: DataTypes.INTEGER,
      references: {
        model: "Games",
        key: "id",
      },
    },
  });

  GameScreenShots.associate = (models) => {
    GameScreenShots.belongsTo(models.Game, {
      foreignKey: "gameID",
      as: "game",
      onDelete: "CASCADE",
      Hooks: true,
    });
  };

  return GameScreenShots;
};
