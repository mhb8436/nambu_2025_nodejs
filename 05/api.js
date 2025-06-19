const express = require("express");
const moment = require("moment");
const Database = require("better-sqlite3");
const path = require("path");
// DB setting
const db_name = path.join(__dirname, "post.db");
const db = new Database(db_name);

// express setting
const app = express();
const PORT = 3000;
app.use(express.json());

// 1. post.db 게시판 전용 테이블을 만들어야합니다.
const create_sql = `
    create table if not exists posts (
        id integer primary key autoincrement, 
        title varchar(255), 
        content text, 
        author varchar(100),
        createdAt datetime default current_timestamp,
        count integer default 0
    )
`;
db.exec(create_sql);

app.post("/posts", (req, res) => {
  const { title, content, author } = req.body;
  let sql = ` 
        insert into posts(title, content, author)
        values( ?, ? ,?);
    `;
  db.prepare(sql).run(title, content, author);
  res.status(201).json({ message: "ok" });
});

// server start
app.listen(PORT, () => {});
