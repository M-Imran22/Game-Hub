module.exports = (sequelize, DataTypes) => {
  const Platform = sequelize.define("Platform", {
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

  Platform.associate = (models) => {
    Platform.belongsTo(models.Game, {
      foreignKey: "gameID",
      as: "game",
      onDelete: "CASCADE",
      Hooks: true,
    });
  };

  return Platform;
};
