module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    "Comment",
    {
      content: DataTypes.TEXT,
      userId: DataTypes.INTEGER,
      postId: DataTypes.INTEGER,
    },
    {
      tableName: "comments",
    }
  );
  Comment.associate = function (models) {
    Comment.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user",
    });
    Comment.belongsTo(models.Post, {
      foreignKey: "postId",
      as: "post",
    });
  };
  return Comment;
}; 