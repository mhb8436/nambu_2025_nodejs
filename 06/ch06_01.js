const { Sequelize, Model, DataTypes, Op } = require("sequelize");
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "sample.db",
});

// 모델 정의
const Post = sequelize.define(
  "Post",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
    },
    author: DataTypes.STRING,
  },
  { tableName: "posts" }
);

// create table posts (
//     title Text,
//     content Text,
//     author Text,
// )

(async () => {
  // 함수는 즉시실행하는 함수 인데
  // 이렇게 하는 이유는 sequelize 는 Promise를 이용해서 작업하는데
  // async/await 를 이용해서 Promise 작업을 하기 위해서 즉시실행함수 안에서 코딩

  await sequelize.sync({ force: true });

  const post1 = await Post.create({
    title: "오늘은 비가 온데요",
    content: "퇴근 시간부터 온데요. 저녁에 오길 ",
    author: "이지훈",
  });
  console.log(`post1 created => ${JSON.stringify(post1)}`);
  const post2 = await Post.create({
    title: "오늘 저녁은 머먹지",
    content: "떡복이와 순대 오뎅이 어떨까요?",
    author: "이지훈",
  });
  console.log(`post2 created => ${JSON.stringify(post2)}`);
})();
