const express = require("express"); // express 모듈 임포트
const moment = require("moment"); // 날짜 모듈 임포트
const Database = require("better-sqlite3"); // sqlite3 모듈 임포트
const path = require("path"); // 경로 모듈 임포트
// DB 설정
const db_name = path.join(__dirname, "post.db"); // sqlite 용 데이터베이스 파일
const db = new Database(db_name); // better-sqlite3의 데이터베이스를 생성(with 데이터베이스파일)

// express setting
const app = express(); // app 이란 변수에 express 함수를 담습니다. app 변수를 이용해서 express 기능사용
const PORT = 3000; // 포트 설정
app.use(express.json()); // app.use 미들웨를 설정하는거에요. 모든 요청과 응답에 json 포멧을 처리한다.

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
db.exec(create_sql); // exec sql을 실행 시킨다.

// app.post => POST 요청을 처리한다.  http://my-url/posts POST -> 두번째인자의 핸들러함수실행
app.post("/posts", (req, res) => {
  const { title, content, author } = req.body;
  // 요청 본문에서 title, content, author : json 포멧
  let sql = ` 
        insert into posts(title, content, author)
        values(?, ? ,?);
    `;

  // insert 쿼리문을 만들어 준다.
  const stmt = db.prepare(sql);
  // 문자열 sql 실제 쿼리문으로 파싱합니다. statement 객체로 만듬
  stmt.run(title, content, author);
  // stmt.run : UPDATE, INSERT, DELETE
  // stmt.all : SELECT * FROM TABLE or SELECT * FROM TABLE WHERE --> [] 배열로 값을 반환
  // stmt.get : SELECT * FROM TABLE LIMIT 1 --> {} 객체로 값을 반환
  res.status(201).json({ message: "ok" });
});

// 게시글 목록 조회 http://localhost:3000/posts GET
app.get("/posts", (req, res) => {
  let sql = `
        select id, title, author, createdAt, count
        from posts order by createdAt desc
    `;
  const stmt = db.prepare(sql); // 쿼리를 준비하세요
  const rows = stmt.all(); //쿼리를 실행하고 결과는 [] 배열로 반환해주세요
  console.log(rows);
  res.status(200).json({ data: rows }); // JSON.stringify({data: rows}) 객체를 JSON 문자열
});

// 게시글 상세 정보조회 http://localhost:3000/2 GET
app.get("/posts/:id", (req, res) => {
  const id = req.params.id;
  let sql = `
        select id, title, content, author, createdAt, count
        from posts where id = ?
    `;
  const stmt = db.prepare(sql); // select 쿼리문이 준비 완료
  const post = stmt.get(id); //  {} 로 반환 합니다.
  res.status(200).json({ data: post }); // json 문자열로 리턴 합니다.
});

// 게시글 수정 (수정할 게시글 id --> req.params, 수정할 내용(title, content) ->req.body )
// http://localhost:3000/posts/1 PUT
app.put("/posts/:id", (req, res) => {
  const id = req.params.id; // 수정할 게시글을 파람에서 가지고와
  const { title, content } = req.body; // 수정할 내용은 본문에서 가지와
  let sql = `
        update posts set title = ?, content = ? 
        where id = ?
    `; // 쿼리문 만들어서
  const stmt = db.prepare(sql); // 쿼리문을 준비시키고
  stmt.run(title, content, id); // stmt.run title, content, id 넣어서 날린다.
  res.json({ message: "ok" });
});

// http://localhost:3000/posts/2 DELETE
app.delete("/posts/:id", (req, res) => {
  const id = req.params.id; // 1. 삭제할 게시글 아이디를 가지고오고
  let sql = `delete from posts where id = ?`; // 2. 쿼리문을 만들어서
  const stmt = db.prepare(sql); // 3. 쿼리문을 준비시기코
  stmt.run(id); // 4. 쿼리문을 실행합니다.
  res.json({ message: "ok" }); // 5. 결과로 응답 줍니다.
});

// server start 서버 시작 시킨다
// npx nodemon api.js
app.listen(PORT, () => {});
