const jwt = require("jsonwebtoken");
const models = require("../models");
const { verifyAccessToken } = require("../utils/token");

const authenticateToken = async (req, res, next) => {
  let token;
  // req.headers.authorization : Bearer eyxxxxxxxx
  if (req.headers.authorization) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return res.status(401).json({ message: "not authorized" });
  }
  
  try {
    // 토큰 검증
    const decoded = verifyAccessToken(token);
    
    // 사용자 정보 조회
    const user = await models.User.findByPk(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    
    // 토큰 버전 검증 (무력화된 토큰인지 확인)
    if (decoded.tokenVersion !== user.tokenVersion) {
      return res.status(401).json({ message: "Token has been invalidated" });
    }
    
    req.user = decoded;
    next(); // 다음 미들웨어 또는 핸들러 함수로 이동하세요
  } catch (error) {
    return res.status(401).json({ message: "not authorized" });
  }
};

module.exports = {
  authenticateToken,
};
