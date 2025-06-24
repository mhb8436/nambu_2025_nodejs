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
  let user1 = await User.create({
    username: "홍길동",
    password: "admin1234",
    email: "a@email.com",
    birthDate: "1990-09-01",
  });
  console.log(`user1 => ${JSON.stringify(user1)}`);
  let user2 = await User.create({
    username: "트럼프",
    password: "admin1234",
    email: "t@email.com",
    birthDate: "1946-09-01",
  });
  console.log(`user2 => ${JSON.stringify(user2)}`);
  // 3. 사용자 전체를 검색해주세요
  let users = await User.findAll();
  console.log(`users => ${JSON.stringify(users)}`);
  // 4. 사용자 아이디가 2번인 사람만 출력해주세요
  let user3 = await User.findByPk(2);
  console.log(`user3 => ${JSON.stringify(user3)}`);
  // 5. 사용자 아이디가 2번인 사람의 email을 jihooni@kakao.com 으로 바꾸고 출력해보세요
  await User.update(
    { email: "jihooni@kaka.com" },
    {
      where: { id: 2 },
    }
  );
  let user4 = await User.findByPk(2);
  console.log(`user4 => ${JSON.stringify(user4)}`);
  // 6. 사용자 아이디가 2번인 사람을 삭제하고, 2번인 사람을 출력해보세요(null)
  await User.destroy({ where: { id: 2 } });
  let user5 = await User.findByPk(2);
  console.log(`user5 => ${JSON.stringify(user5)}`);
})();
