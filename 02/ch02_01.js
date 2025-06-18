// 파일 다루기 fs 모듈 이용
const fs = require("fs"); // fs 모듈(파일 다루기 모듈) 임포트

// fs.writeFileSync("test.txt", "hello world!");
// console.log("파일 쓰기 완료");

// 문제 1 hello.txt 만들고, 내용에는 안녕하세요 반갑습니다. 제 이름은 이지훈입니다.
// fs.writeFileSync("hello.txt", "안녕하세요 반갑습니다. 제 이름은 이지훈입니다.");

// 파일 읽기
// const data = fs.readFileSync("test.txt", "utf-8"); // utf-8 인코딩
// console.log(data);

// // 문제 2  hello.txt 읽어서 콘솔로 출력 해보세용
// // 만약 hello.txt 1기가 짜리 파일 이었다 17 라인은 16라인이 처리끝날때까지 대기
// const data2 = fs.readFileSync("hello.txt", "utf-8");
// console.log(data2);

// const stats1 = fs.statSync("test.txt");
// console.log(stats1);

// fs.writeFile("async-test.txt", "Async Hello World!", (err) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log("비동기 파일 쓰기 완료");
// });

// 문제 3 async-hello.txt 파일을 만들고, 안녕하세요 비동기 파일 쓰기 테스트 작업입니다.

// fs.writeFile(
//   "async-hello.txt",
//   "안녕하세요 비동기 파일 쓰기 테스트 작업입니다.",
//   (err) => {
//     if (err) {
//       console.log(err);
//     }
//     console.log("비동기 파일 쓰기 작업 완료");
//   }
// );

// fs.readFile("async-test.txt", "utf-8", (err, data) => {
//   if (err) {
//     console.log("읽기 에러", err);
//   }
//   console.log("비동기파일읽기", data);
// });

// // 문제 4 async-hello.txt 를 fs.readFile 로 읽어보세요
// fs.readFile("async-hello.txt", "utf-8", (err, data) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(data);
// });

const fsPromise = require("fs").promises;

const fileOp = async () => {
  try {
    await fsPromise.writeFile("promise-test.txt", "Promise Hello World");
    console.log("파일 쓰기 완료");

    const data = await fsPromise.readFile("promise-test.txt", "utf-8");
    console.log("파일 읽기 ", data);
  } catch (e) {
    console.log(e);
  }
};

fileOp();

// 문제 5 fileOp2 함수를 만들고 promise 방식으로 promise-hello.txt 넣고
// 안녕하세요 프로미스 방식으로 파일을 읽는 연습을 하고 있어요 쓰고,  prosmise-hello.txt 다시 읽어서
// 콘솔에 출력해보세요
const fileOp2 = async () => {
  try {
    await fsPromise.writeFile(
      "promise-hello.txt",
      "안녕하세요 프로미스 방식으로 파일을 읽는 연습을 하고 있어요"
    );
    const data = await fsPromise.readFile("promise-hello.txt", "utf-8");
    console.log(data);
  } catch (e) {
    console.log(e);
  }
};

fileOp2();
