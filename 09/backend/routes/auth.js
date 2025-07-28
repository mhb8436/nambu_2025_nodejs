const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const { validateRegister } = require("../middlewares/validation");

router.post("/register", validateRegister, authController.register);
router.post("/login", authController.login);
router.get("/naver/url", authController.getNaverLoginUrl);
router.get("/naver/callback", authController.naverCallback);
module.exports = router;
