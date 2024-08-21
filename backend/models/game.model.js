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
    publisherName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    releaseDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    salePrice: {
      type: DataTypes.INTEGER,
    },
    gameDescription: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  Game.associate = (models) => {
    Game.hasMany(models.Platform, {
      foreignKey: "gameID",
      as: "platforms",
      onDelete: "CASCADE",
      Hooks: true,
    });

    Game.hasMany(models.Genre, {
      foreignKey: "gameID",
      as: "genres",
      onDelete: "CASCADE",
      Hooks: true,
    });
    Game.hasMany(models.GameScreenShots, {
      foreignKey: "gameID",
      as: "screenshots",
      onDelete: "CASCADE",
      Hooks: true,
    });
  };

  return Game;
};
