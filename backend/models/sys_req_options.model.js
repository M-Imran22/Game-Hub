module.exports = (sequelize, DataTypes) => {
  const System_requirement_options = sequelize.define(
    "System_requirement_options",
    {
      value: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      requirement_type_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "System_requirement_types",
          key: "id",
        },
      },
    },
    {
      tableName: "System_requirement_options",
      underscored: true,
    }
  );

  System_requirement_options.associate = (models) => {
    System_requirement_options.belongsTo(models.System_requirement_types, {
      foreignKey: "requirement_type_id",
      as: "requirement_type",
    });
  };

  return System_requirement_options;
};
