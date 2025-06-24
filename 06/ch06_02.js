const { Sequelize, Model, DataTypes, Op } = require("sequelize");
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "sample.db",
});

// 모델 정의
const User = sequelize.define(
  "User",
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    birthDate: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: "users",
  }
);

(async () => {
  // 1. 모델로 테이블을 생성하는 코드를 넣어보세용
  await sequelize.sync({ force: false });

  // 2. 사용자를 2명 생성해 주세요 각각 결과를 출력해주세요

  // 3. 사용자 전체를 검색해주세요

  // 4. 사용자 아이디가 2번인 사람만 출력해주세요

  // 5. 사용자 아이디가 2번인 사람의 email을 jihooni@kakao.com 으로 바꾸고 출력해보세요

  // 6. 사용자 아이디가 2번인 사람을 삭제하고, 2번인 사람을 출력해보세요(null)
})();
