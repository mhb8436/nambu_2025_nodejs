const jwt = require("jsonwebtoken");

const generateAccessToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      tokenVersion: user.tokenVersion, // 토큰 버전 추가
    }, // 페이로드 : 토큰에 담길 유저 정보
    "access_token", // 토큰 서명키, 이 키를 이용해서 토큰의 유효성을 검증
    { expiresIn: "30d" } // 만료일 30d : 30일
  );
};

const verifyAccessToken = (token) => {
  try {
    return jwt.verify(token, "access_token");
  } catch (error) {
    throw new Error("Invalid token");
  }
};

module.exports = {
  generateAccessToken,
  verifyAccessToken,
};
