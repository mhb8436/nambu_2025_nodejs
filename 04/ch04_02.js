const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send(`
        <html>
            <head>
                <title>첫번째 마이 홈피</title>
            </head>
            <body>
                <h1>첫번째 익스프레스 홈</h1>
                <nav>
                    <a href="/">홈</a>
                    <a href="/about">소개</a>
                    <a href="/contact">연락처</a>
                </nav>
                <p>익스프레스로 만든 간단한 홈피 입니다. </p>
            </body>
        </html>    
    `);
});

app.get("/about", (req, res) => {
  res.send(`
        <h1>소개 페이지</h1><p>이 홈피는 익스프레스 학습을 위해 만들었어용</p>    
    `);
});

app.get("/contact", (req, res) => {
  res.send(`
        <h1>연락처</h1><p>이메일: mhb8436@gmail.com</p>    
    `);
});

// 문제 1 서버 시작 코드를 넣어보세요 포트는 3001 입니다.
// 서버를 시작해보시고, http://localhost:3001/ 로 접속해보세요
app.listen(3001, () => {
  console.log(`서버가 http://localhost:3001/ 실행 중입니다.`);
});
