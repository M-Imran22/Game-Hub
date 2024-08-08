module.exports = (sequelize, DataType) => {
  const User = sequelize.define("User", {
    username: {
      type: DataType.STRING,
      allownull: false,
      unique: true,
    },
    email: {
      type: DataType.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataType.STRING,
      allowNull: false,
    },
    role: {
      type: DataType.STRING,
      allowNull: false,
    },
  });

  return User;
};
