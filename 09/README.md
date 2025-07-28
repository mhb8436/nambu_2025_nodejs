# 네이버 로그인 통합 프로젝트

이 프로젝트는 기존 로컬 로그인과 함께 네이버 OAuth 로그인을 지원하는 풀스택 애플리케이션입니다.

## 프로젝트 구조

```
09/
├── backend/          # Node.js + Express 백엔드
├── frontend/         # React 프론트엔드
└── README.md         # 이 파일
```

## 네이버 로그인 설정 방법

### 1. 네이버 개발자 센터에서 애플리케이션 등록

1. [네이버 개발자 센터](https://developers.naver.com/)에 접속
2. 애플리케이션 등록
3. 서비스 URL: `http://localhost:3001`
4. Callback URL: `http://localhost:3000/auth/naver/callback`

### 2. 백엔드 설정

`backend/config/config.json` 파일에서 네이버 클라이언트 정보를 업데이트하세요:

```json
{
  "naver": {
    "clientId": "YOUR_NAVER_CLIENT_ID",
    "clientSecret": "YOUR_NAVER_CLIENT_SECRET",
    "redirectUri": "http://localhost:3000/auth/naver/callback"
  }
}
```

### 3. 실행 방법

#### 백엔드 실행

```bash
cd backend
npm install
npm start
```

#### 프론트엔드 실행

```bash
cd frontend
npm install
npm start
```

## 주요 기능

### 백엔드 기능

- 기존 로컬 로그인/회원가입
- 네이버 OAuth 로그인
- JWT 토큰 기반 인증
- 사용자 정보 관리

### 프론트엔드 기능

- 로컬 로그인 폼
- 네이버 로그인 버튼
- 네이버 콜백 처리
- 인증 상태 관리

## API 엔드포인트

### 인증 관련

- `POST /auth/register` - 회원가입
- `POST /auth/login` - 로컬 로그인
- `GET /auth/naver/url` - 네이버 로그인 URL 생성
- `GET /auth/naver/callback` - 네이버 로그인 콜백 처리

## 데이터베이스 스키마

### User 모델

- `id`: 기본 키
- `name`: 사용자 이름
- `email`: 이메일 주소
- `password`: 비밀번호 (로컬 로그인용)
- `naverId`: 네이버 사용자 ID
- `provider`: 로그인 제공자 ('local' 또는 'naver')
- `role`: 사용자 역할 ('admin' 또는 'user')

## 주의사항

1. 네이버 개발자 센터에서 받은 클라이언트 ID와 시크릿을 `config.json`에 정확히 입력하세요.
2. Callback URL이 정확히 설정되어야 합니다.
3. 개발 환경에서는 `http://localhost:3000`과 `http://localhost:3001`을 사용합니다.
4. 프로덕션 환경에서는 실제 도메인으로 변경해야 합니다.

## 문제 해결

### 일반적인 문제들

1. **네이버 로그인이 작동하지 않는 경우**

   - 클라이언트 ID와 시크릿이 올바른지 확인
   - Callback URL이 정확한지 확인
   - 네트워크 연결 상태 확인

2. **데이터베이스 오류**

   - `npm run db:reset`으로 데이터베이스 초기화
   - Sequelize 설정 확인

3. **포트 충돌**
   - 백엔드: 3000번 포트
   - 프론트엔드: 3001번 포트
   - 포트가 사용 중인지 확인
