let pi;
console.log(pi); // undefined
pi = 3.141592
console.log(pi); // 3.141592

let radius = 12;
console.log(`넓이 : ${pi * radius * radius}`); // pi r ^2
console.log(`둘레 : ${pi * 2 * radius}`) //

 // 문제1.  area 라는 변수를 만들고 radius 15  인 경우 area 넓이를 계산해서 
 // 넣어보세용. console.log로 area 를 출력해보세요
radius = 15;
let area = pi * radius * radius;
console.log(area)

// 문제2. 사각형의 넓이를 계산 width, height 에서 각각 값을 넣고
// area2 라는 변수에 넓이를 넣어보세용. 그리고 area2를 출력
let width = 10;
let height = 20
let area2 = width * height;
console.log(area2)

let num = 0
num++;  // num = num + 1 
console.log(num); // 1
num--; // num = num - 1
console.log(num); // 0


console.log(String(52)); // "52"
console.log(typeof String(52)) // String

console.log(Number("52")); // 52 
console.log(typeof Number("52")) // number

console.log(parseInt("1234")); // 1234
console.log(parseInt("1234.56")); // 1234
console.log(parseFloat("1234.56")); // 1234.56

console.log(Number("hello"))
console.log(isNaN(Number("hello")))

console.log(typeof 10); // number
console.log(typeof "hello"); // string
console.log(typeof true); // boolean
console.log(typeof function () {}); // function
console.log(typeof {}); // object
console.log(typeof []); // object

const test = "변경불가"
test = "값이 변경되나요?";
console.log(test)