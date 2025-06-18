const path = require("path");

// const fullPath = path.join(__dirname, "files", "a", "b", "test.txt");
// console.log(`전체경로 : ${fullPath}`); // files/a/b/test.txt
// // __dirname : 현재 파일의 디렉토리 절대경로를 가져옴

// // 문제 1 : fullPath2 변수에 현재디렉토리/files/tasks/jobs/01.txt 경로를 만들어보세요
// const fullPath2 = path.join(__dirname, "files", "tasks", "jobs", "01.txt");
// console.log(fullPath2);

// const pathParts = path.parse(fullPath);
// console.log(pathParts);

// // 문제 2 : fullPath2 를 parse 를 이용해서 경로를 분리해보세요 변수명은 pathParts2
// const pathParts2 = path.parse(fullPath2);
// console.log(pathParts2);

// const ext = path.extname(fullPath);
// console.log(ext);
const fs = require("fs"); // filesystem

const dirPath = path.join(__dirname, "new-dir");
console.log(dirPath);
// 경로가 있으면 true, 없으면 false
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

// 문제 1. dirPath2 변수를 만들고 현재디렉토리 밑에 tasks 디렉토리를 만들어보세요
// 디렉토리가 존재하면 안만들고, 존재하지 않으면 만들어줍니다.
const dirPath2 = path.join(__dirname, "tasks");
if (!fs.existsSync(dirPath2)) {
  fs.mkdirSync(dirPath2);
}

const dirPath3 = path.join(__dirname, "tasks", "jobs", "01"); //경로 만들고
if (!fs.existsSync(dirPath3)) {
  // 경로가 존재여부 체크
  fs.mkdirSync(dirPath3, { recursive: true }); // 실제 디렉토리 생성
}

const filePath = path.join(dirPath3, "test.txt");
fs.writeFileSync(filePath, "디렉토리 생성후 파일 생성 테스트");

// 문제 2 : 현재 디렉토리 밑에 main/src/code/javascript.txt 파일을 생성하고
//         파일 안에 "자바스크립트 테스트 파일입니다." 을 쓰세요
//         1) 디렉토리를 만든다 2) 파일을 만들고 쓴다.
const dirPath4 = path.join(__dirname, "main", "src", "code");
if (!fs.existsSync(dirPath4)) {
  fs.mkdirSync(dirPath4, { recursive: true });
}
const filePath4 = path.join(dirPath4, "javascript.txt");
fs.writeFileSync(filePath4, "자바스크립트 테스트 파일 입니다.");

// 디렉토리 이름 변경
const newDirPath = path.join(__dirname, "rename-dir");
fs.renameSync(dirPath, newDirPath); // 경로 변경 == 디렉토리 변경 ( mv )

// 디렉토리 삭제
fs.rmdirSync(newDirPath);
