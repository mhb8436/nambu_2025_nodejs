const models = require("../models");
const bcrypt = require("bcryptjs");
const { generateAccessToken } = require("../utils/token");
const axios = require("axios");
const config = require("../config/config.json");

const register = async (req, res) => {
  const { email, name, password } = req.body;
  // password 암호화
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await models.User.create({
    email: email,
    name: name,
    password: hashedPassword,
  });
  console.log("register", user);
  res.status(201).json({ message: "ok", data: user });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  // 1. 이메일로 사용자가 있는지 확인
  const user = await models.User.findOne({
    where: { email: email },
  });
  // 2. 사용자가 없으면 잘못된 이메일 비밀번호라고 알려줌
  if (!user) {
    return res.status(400).json({ message: "Invalid email and password" });
  }
  // 3. 사용자가 있으면 비밀번호 비교
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    // 비밀번호가 일치하지 않으면 사용자에게 노티
    return res.status(400).json({ message: "Invalid email and password" });
  }
  // 4. 정당한 사용자(이메일과 비밀번호가 일치하면) 임시허가증 발급
  const accessToken = generateAccessToken(user);
  res.json({ message: "ok", accessToken: accessToken, user });
};

// 네이버 로그인 URL 생성
const getNaverLoginUrl = async (req, res) => {
  const naverAuthUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${
    config.naver.clientId
  }&redirect_uri=${encodeURIComponent(
    config.naver.redirectUri
  )}&state=${Math.random().toString(36).substr(2, 9)}`;
  res.json({ url: naverAuthUrl });
};

// 네이버 콜백 처리
const naverCallback = async (req, res) => {
  const { code, state } = req.query;

  if (!code) {
    return res.status(400).json({ message: "인증 코드가 없습니다." });
  }

  try {
    console.log("네이버 콜백 시작:", { code, state });

    // 1. 네이버에서 액세스 토큰 받기
    const tokenResponse = await axios.post(
      "https://nid.naver.com/oauth2.0/token",
      null,
      {
        params: {
          grant_type: "authorization_code",
          client_id: config.naver.clientId,
          client_secret: config.naver.clientSecret,
          code: code,
          state: state,
        },
      }
    );

    console.log("토큰 응답:", tokenResponse.data);
    const { access_token } = tokenResponse.data;

    // 2. 네이버 사용자 정보 가져오기
    const userInfoResponse = await axios.get(
      "https://openapi.naver.com/v1/nid/me",
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    console.log("사용자 정보 응답:", userInfoResponse.data);
    const naverUser = userInfoResponse.data.response;

    // 3. 네이버 ID로 사용자 찾기 또는 생성
    let user = await models.User.findOne({
      where: { naverId: naverUser.id },
    });

    if (!user) {
      // 새 사용자 생성
      user = await models.User.create({
        name: naverUser.name,
        email: naverUser.email || `${naverUser.id}@naver.com`, // 이메일이 없을 경우 기본값
        naverId: naverUser.id,
        provider: "naver",
        password: "", // 네이버 로그인은 비밀번호 없음
      });
    }

    // 4. JWT 토큰 생성
    const jwtToken = generateAccessToken(user);

    // 5. 프론트엔드로 리다이렉트 (토큰을 URL 파라미터로 전달)
    const frontendUrl = `http://localhost:3001/auth/naver/callback?token=${jwtToken}&user=${encodeURIComponent(
      JSON.stringify(user)
    )}`;
    console.log("프론트엔드 리다이렉트 URL:", frontendUrl);
    res.redirect(frontendUrl);
  } catch (error) {
    console.error(
      "네이버 로그인 에러 상세:",
      error.response?.data || error.message
    );
    res
      .status(500)
      .json({ message: "네이버 로그인 처리 중 오류가 발생했습니다." });
  }
};

module.exports = {
  register,
  login,
  getNaverLoginUrl,
  naverCallback,
};
