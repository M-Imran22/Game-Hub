module.exports = (sequelize, DataTypes) => {
  const Game = sequelize.define("Game", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    gameName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gameImage: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  Game.associate = (models) => {
    Game.hasMany(models.Platform, {
      foreignKey: "gameID",
      as: "platform",
    });
  };

  return Game;
};
