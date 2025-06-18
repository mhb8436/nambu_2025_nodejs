let arr = [5, 23, "hello", true, "world", -9]
console.log(arr)
console.log(arr[1])

// for (초기조건; 종료조건;증감조건) 
for (let i=0;i<arr.length ;i++) {
    console.log(`${i} is ${arr[i]}`)
}
console.log('------for in -------')
// for .. in  . i< = index
for(i in arr) {
    console.log(`${i} is ${arr[i]}`)
}
console.log('------for of -------')
// for .. of 
for(e of arr) {
    console.log(e)
}
console.log('----break-----')
// [5, 23, "hello", true, "world", -9]
for(i in arr) {
    if(typeof arr[i] == "string") {
        break;
        // 이걸 만나면 아예 loop 종료함 
    }
    console.log(arr[i]);
}
console.log('----continue-----')
// [5, 23, "hello", true, "world", -9]
for(i in arr) {
    if(typeof arr[i] == "string") {
        continue; 
        // 이후 로직 수행안하고 다음 반복으로 바로 넘어감
    }
    console.log(arr[i]);
}

// 문제 1 배열 : [1, 2, "멈춰", 3, 4, true, false] 에서 "멈춰"가 나오면 멈추는 코드를 만들어보세요 
console.log("---- 문제 1------")
const p1 = [1,2,"멈춰",3,4,true,false]
for(i in p1) {
    // console.log(i, p[i])
    if(p1[i] == "멈춰"){
        break;
    }
    console.log(p1[i])
}

// 문제 2 배열 [5,10,15,20,25] 에서 20 이상이 나오면 멈추는 코드를 만들어보세요 
console.log("---- 문제 2 -----")
const p2 = [5,10,15,20,25];
for(i in p2) {
    if(p2[i] >= 20) {
        break
    }
    console.log(p2[i])
}

// 문제 3 배열 [1,2,3,4,5,6,7,8,9,10] 에서 짝수만 나오는 코드를 만들어보세요 continue 사용 
console.log("---- 문제 3 -----")
const p3 = [1,2,3,4,5,6,7,8,9,10]
for(i in p3) {
    // p3[i] % 2 == 0 -> 짝수, 아니면 -> 홀수 
    if(p3[i] % 2 == 1) {
        continue;
    }
    console.log(p3[i]);
}

// 문제 4 1부터 10까지 돌면서 3의 배수는 건너뛰고 나머지를 출력하는 코드를 만들어보세요. continue 
// 3, 6, 9 % 3 = 0
console.log("---- 문제 4 ------")
for(let i=1;i<=10;i++) {
    if(i % 3 == 0) {
        continue
    }
    console.log(i)
}

// 문제 5 배열 ["사과", 1, "바나나", 2, "포도", false ] 에서 문자열만 나오는 코드를 만들어보세요 
// typeof value == "string"
console.log("----- 문제 5 ------")
const p5 = ["사과",1,"바나나",2,"포도",false]
for(i in p5) {
    if(typeof p5[i] == "string"){
        console.log(p5[i])
    }
}