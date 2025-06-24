//  CREATE TABLE if not exists todos (
//         task VARCHAR(255),
//         description TEXT,
//         completed BOOLEAN DEFAULT 0, --> BOOLEAN
//         priority INTEGER DEFAULT 1
//     )`;

completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
},
priority : {
    type: DataTypes.INTEGER,
    defaultValue: 1
}

// 문제 1 : Todo 모델, todos  생성
// 문제 2 : Todo 데이터를 2개 입력
// 문제 3 : Todo 데이터를 전체 조회
// 문제 4 : Todo 아이디가 2번인 항목조회
// 문제 5 : Todo 아이디가 2번인 항목의 completed 를 완료로 바꿈
// 문제 6 : Todo 아이디가 2번인 항목 삭제
