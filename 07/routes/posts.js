const express = require("express");
const router = express.Router();
const postController = require("../controllers/posts");
const { uploadSingle } = require("../middlewares/upload");

router.post("/", uploadSingle, postController.createPost);

module.exports = router;
