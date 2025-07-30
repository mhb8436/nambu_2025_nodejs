module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      naverId: DataTypes.STRING,
      provider: {
        type: DataTypes.ENUM("local", "naver"),
        defaultValue: "local",
      },
      role: {
        type: DataTypes.ENUM("admin", "user"),
        defaultValue: "user",
      },
      tokenVersion: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
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
    User.hasMany(models.Comment, {
      foreignKey: "userId",
      as: "comments",
    });
  };
  return User;
};
