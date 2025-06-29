# 노트 앱 프론트엔드

이 프로젝트는 Node.js RESTful API를 사용하는 React 기반의 노트 앱 프론트엔드입니다.

## 기능

- 노트 목록 조회
- 태그별 노트 필터링
- 노트 상세 보기
- 새 노트 작성
- 노트 수정
- 노트 삭제

## 시작하기

1. 의존성 설치:
```bash
npm install
```

2. 개발 서버 실행:
```bash
npm start
```

## 주요 의존성

- React
- React Router DOM
- Axios
- Bootstrap

## API 엔드포인트

- GET /notes - 노트 목록 조회
- GET /notes/:tag - 태그로 노트 목록 조회
- GET /notes/:id - 특정 노트 조회
- POST /notes - 새 노트 생성
- PUT /notes/:id - 노트 수정
- DELETE /notes/:id - 노트 삭제
