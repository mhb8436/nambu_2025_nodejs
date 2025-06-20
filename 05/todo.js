// 필요 모듈 임포팅
const express = require("express");
const path = require("path");
const moment = require("moment");
const Database = require("better-sqlite3");

// 데이터베이스 설정
const db_name = path.join(__dirname, "todo.db");
const db = new Database(db_name);

const create_sql = `
    create table if not exists todos (
        id integer primary key autoincrement,
        task varchar(255),
        description text,
        completed boolean default 0,
        createdAt datetime default current_timestamp,
        priority integer default 1
    );
`;
db.exec(create_sql);

// 1. 할일 쓰기 POST http://localhost:3000/todos

// 2. 할일 목록 조회 GET http://localhost:3000/todos

// 3. 할일 1건 조회 GET http://localhost:3000/todos/1

// 4. 할일 수정 PUT http://localhost:3000/todos/1

// 5. 할일 삭제 DELETE http://localhost:3000/todos/1

// 익스프레스 설정
const app = express();
const PORT = 3000;
app.use(express.json()); // 요청과 응답에 json파싱

//  서버 시작
// npx nodemon todo.js
app.listen(PORT, () => {});
