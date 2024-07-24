module.exports = (sequelize, DataTypes) => {
  const System_requirement_types = sequelize.define(
    "System_requirement_types",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "System_requirement_types",
      underscored: true,
    }
  );

  System_requirement_types.associate = (models) => {
    System_requirement_types.hasMany(models.System_requirement_options, {
      foreignKey: "requirement_type_id",
      as: "options",
    });
  };

  return System_requirement_types;
};
