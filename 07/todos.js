// express + sequelize crud 를 제공하는 서버가 이 파일에 코딩될거에요
// todos restful api 서버가 코딩 될거에요
// 관련된 모듈 임포트 먼저
const express = require("express");
const models = require("./models");
const app = express();
const PORT = 3000;

app.use(express.json());
app.post("/todos", (req, res) => {});

app.get("/todos", (req, res) => {});

app.get("/todos/:id", (req, res) => {});

app.put("/todos/:id", (req, res) => {});

app.delete("/todos/:id", (req, res) => {});

app.listen(PORT, () => {
  console.log(`Todo 서버거 http://localhost:${PORT} 에서 실행중`);
});
