module.exports = (sequelize, DataTypes) => {
  const Genre = sequelize.define("Genre", {
    genreName: {
      type: DataTypes.STRING,
    },

    slug: {
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

  Genre.associate = (models) => {
    Genre.belongsTo(models.Game, {
      foreignKey: "gameID",
      as: "game",
      onDelete: "CASCADE",
      Hooks: true,
    });
  };

  return Genre;
};
