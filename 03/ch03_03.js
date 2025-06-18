const moment = require("moment");

const nowDate = moment(); // 현재시각을 가지옵니다.
console.log(nowDate.format("YYYY-MM-DD HH:mm:ss"));
console.log(nowDate.format("YYYY년 MM월 DD일"));
console.log(nowDate.format("YYYY년 MM월 DD일 HH시 mm분 ss초"));

// 문제 1 현재 날짜 + 시각을 2025/06/18 형태로 출력해보세요
console.log(nowDate.format("YYYY/MM/DD"));

// 날짜 포멧팅 : 특정 날짜의 문자열을 모멘트 객체 형태로 바꿀 수 있습니다.
const dateMoment = moment("2024-03-30");
console.log(dateMoment);

// 시간을 추가 및 빼기
const nextDays = nowDate.add(7, "weeks");
console.log(nextDays);

// 시간 차이 계산
const startDate = moment();
const endDate = moment("2025-08-20");
const diffDay = endDate.diff(startDate, "days");
console.log("과정 종료까지 남은 날수 ", startDate, endDate, diffDay);

// 문제 2 오늘 부터 100일 후의 날짜를 YYYY년 MM월 DD 일로 출력해보세요
const todayDate = moment();
const t100 = todayDate.add(100, "days");
console.log(
  `${moment().format("YYYY년MM월DD일")} 에서 100일 후의 날짜는 ${t100.format(
    "YYYY년MM월DD일"
  )}`
);
// 문제 3 2024-03-15 부터 2025-09-20 일 까지 몇 개월이 지났는지 계산해보세요
const s1 = moment("2024-03-15");
const e1 = moment("2025-09-20");
const mb1 = e1.diff(s1, "months");
console.log(mb1);

// 문제 4 크리스마스 까지 남은 일수를 계산해보세용
const s2 = moment();
const e2 = moment("2025-12-25");
const mb2 = e2.diff(s2, "days");
console.log(mb2);

require("moment/locale/ko"); // 한국어 로케일 불러오기
moment.locale("ko"); // 한국어 로케일 설정
const s3 = moment();
console.log(`요일 : ${s3.format("d")}`); // 3
console.log(`요일 : ${s3.format("dd")}`); // We
console.log(`요일 : ${s3.format("ddd")}`); // Wed
console.log(`요일 : ${s3.format("dddd")}`); // Wednesday

// 문제 5 올해 크리스마스는 무슨 요일일까요?
const s4 = moment("2025-12-25");
console.log(`올해 크리스마스는 ${s4.format("dddd")}`);

// 문제 6 자신이 태어날 날의 요일을 출력해보세요
const s5 = moment("1975-11-16");
console.log(`제가 태어난 요일은 ${s5.format("dddd")}`);
