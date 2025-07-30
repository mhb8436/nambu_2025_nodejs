module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post",
    {
      title: DataTypes.STRING,
      content: DataTypes.TEXT,
      authorId: DataTypes.INTEGER,
      imageUrls: DataTypes.TEXT, // JSON 문자열로 저장
    },
    {
      tableName: "posts",
    }
  );
  Post.associate = function (models) {
    Post.belongsTo(models.User, {
      foreignKey: "authorId",
      as: "author",
    });
    Post.hasMany(models.Comment, {
      foreignKey: "postId",
      as: "comments",
    });
  };
  return Post;
}; 