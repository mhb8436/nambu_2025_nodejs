// 테이블 생성 구문
//  CREATE TABLE if not exists todos (
//         id INTEGER PRIMARY KEY AUTOINCREMENT,
//         task VARCHAR(255),
//         description TEXT,
//         completed BOOLEAN DEFAULT 0,
//         createdAt datetime default current_timestamp,
//         priority INTEGER DEFAULT 1
//     )`;
// 모델 생성 참고
// completed: {
//     type: DataTypes.BOOLEAN,
//     defaultValue: false
// },
// priority : {
//     type: DataTypes.INTEGER,
//     defaultValue: 1
// }
const { Sequelize, Model, DataTypes, Op } = require("sequelize");
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "sample.db",
});

const Todo = sequelize.define(
  "Todo",
  {
    task: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    priority: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
  },
  {
    tableName: "todos",
  }
);

(async () => {
  // 문제 1 : Todo 모델, todos  생성
  await sequelize.sync({ force: false });
  // 문제 2 : Todo 데이터를 2개 입력
  const todo1 = await Todo.create({
    task: "오늘 저녁은 닭도리탕 해먹기",
    description: "GS마트에서 닭복음탕용 양념 + 닭을 사기",
  });
  console.log(`todo1 => ${JSON.stringify(todo1)}`);
  const todo2 = await Todo.create({
    task: "비오기 전에 퇴근하기",
    description: "제발 퇴근전에 비오지 말아라.. 20시부터 오세요",
  });
  console.log(`todo2 => ${JSON.stringify(todo2)}`);
  // 문제 3 : Todo 데이터를 전체 조회
  const todos = await Todo.findAll();
  console.log(`todos => ${JSON.stringify(todos)}`);
  // 문제 4 : Todo 아이디가 2번인 항목조회
  const todo3 = await Todo.findByPk(2);
  console.log(`todo3 => ${JSON.stringify(todo3)}`);
  // 문제 5 : Todo 아이디가 2번인 항목의 completed 를 완료로 바꿈
  await Todo.update({ completed: true }, { where: { id: 2 } });
  const todo4 = await Todo.findByPk(2);
  console.log(`todo4 => ${JSON.stringify(todo4)}`);
  // 문제 6 : Todo 아이디가 2번인 항목 삭제
  await Todo.destroy({ where: { id: 2 } });
  const todo5 = await Todo.findByPk(2);
  console.log(`todo5 => ${JSON.stringify(todo5)}`);
})();
