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
// 게시글 목록 조회
app.get("/posts", (req, res) => {
  let sql = `
        select id, title, content, author, createdAt
        from posts order by createdAt desc
    `;
  const stmt = db.prepare(sql); // 쿼리를 준비하세요
  const rows = stmt.all(); // 쿼리를 날려주세요
  console.log(rows);
  res.status(200).json({ data: rows });
});
// 게시글 상세 정보조회
app.get("/posts/:id", (req, res) => {
  const id = req.params.id;
  let sql = `
        select id, title, content, author, createdAt, count
        from posts where id = ?
    `;
  const stmt = db.prepare(sql); // select 쿼리문이 준비 완료
  const post = stmt.get(id); //  실제 쿼리문이 실행
  res.status(200).json({ data: post });
});

// 게시글 수정
// http://localhost:3000/posts/1
app.put("/posts/:id", (req, res) => {
  const id = req.params.id;
  const { title, content } = req.body;
  let sql = `
        update posts set title = ?, content = ? 
        where id = ?
    `;
  const stmt = db.prepare(sql);
  stmt.run(title, content, id); // 실제 쿼리문 데이터베이스 실행
  res.redirect("/posts"); // GET http://localhost:3000/posts
  //   res.json({ message: "ok" });
});

// server start
app.listen(PORT, () => {});
