module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      role: {
        type: DataTypes.ENUM("admin", "user"),
        defaultValue: "user",
      },
    },
    {
      tableName: "users",
    }
  );
  User.associate = function (models) {
    User.hasMany(models.Post, {
      foreignKey: "authorId",
      as: "posts",
    });
  };
  return User;
};
