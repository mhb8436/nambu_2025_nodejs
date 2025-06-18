// 예를들어 이지훈 이라는 객체를 표현
const name ="이지훈"
const age = 40
const job = "developer"

const name1 = "홍길동"
const age1 = 10
const job1 = "sw 개발자"

const person1 = {
    name : '이지훈',
    age : 50,
    job: 'sw engineer'
}
console.log(person1.name, person1['name'])
person1.hobby = ["cook", "fishing"]
console.log(person1)
console.log(Object.keys(person1));
console.log(Object.values(person1));

person1.addAge = function() {
    this.age = this.age + 1;
}
person1.addAge();
console.log(person1);


class PersonInfo {
    constructor(name, age, address) {
        this.name = name;
        this.age = age;
        this.address = address;
    }

    addAge(age) {
        this.age = this.age + age;
    }

    getAge(){
        return this.age
    }
}

let p1 = new PersonInfo("이지훈", 50, "신정동")
console.log(p1)
p1.addAge(50)
console.log(p1.getAge())

class Employee extends PersonInfo {
    constructor(name, age, address, salary) {
        super(name, age, address)
        this.salary = salary;
    }
}

let e1 = new Employee("홍길동", 60, "인천 부평", 1000000)
console.log(e1)

try{
    // 데이터베이스 커넥션 얻어와서 
    // 데이터베이스에 데이터 질의 
    const arr = new Array(-1)
}catch(e){
    // 데이터 질의 하다가 예외 발생했을 때처리 
    console.log("예외 발생", e)
}finally {
    // 데이터베이스 커넥션 닫아주기 
    console.log("예외가 발생해도 이작업은 반드시 필요 ")
}

try{
    const err = new Error("나만의 에러")
    err.name = "나만의 에러"
    err.message = "나만의 에러가 완성되었엉요"
    throw err
}catch(e) {
    console.log(e.name, e.message)
}

// 문제 1 클래스명은 CarInfo, 속성은 brand, color, model : string 타입  
//       메서드는 drive() -> "모델 xx가 달리는 중", stop() -> "모델 xx가 멈췄습니다."
//       객체를 2개 정도 생성 후에 drive, stop 메소드 호출 해보기 
class CarInfo {
    constructor(brand, color, model) {
        this.brand = brand;
        this.color = color;
        this.model = model;
    }
    drive() {
        console.log(`모델 ${this.model}이(가) 달리는 중`)
    }
    stop() {
        console.log(`모델 ${this.model}이(가) 멈춤`)
    }
}
let c1 = new CarInfo("현대","쥐색","소나타")
let c2 = new CarInfo("현대","흰색","그랜져")
c1.drive(); 
c2.drive();

// 문제 2 CarInfo를 상속 받아서 ElectricCarInfo를 만들어보세요 
//       추가 속성은 battery,
//       추가로 charge() -> "모델 xx가 충전 중", stop() -> "모델 xx가 멈췄습니다." 메소드 추가 
//       객체를 2개 정도 생성 후에 charge, drive, stop 메소드 호출 해보기 

class ElectricCarInfo extends CarInfo {
    constructor(brand, color, model, battery){
        super(brand, color, model);
        this.battery = battery
    }
    charge() {
        console.log(`모델 ${this.model}이(가) 충전 중 `)
    }
}

let ec1 = new ElectricCarInfo("테슬라","쥐색", "모델y", 40000 )
ec1.charge()
ec1.stop()


