const express = require("express");
const router = express.Router();
const postController = require("../controllers/posts");
const { uploadSingle, uploadMultiple } = require("../middlewares/upload");
const { authenticateToken } = require("../middlewares/auth");

router.post("/", authenticateToken, uploadMultiple, postController.createPost);
router.get("/", postController.findPosts);
router.get("/:id", postController.findPost);
router.put(
  "/:id",
  authenticateToken,
  uploadMultiple,
  postController.updatePost
);
router.delete("/:id", postController.deletePost);

router.post(
  "/:postId/comments",
  authenticateToken,
  postController.createComment
);
router.get("/:postId/comments", postController.findComments);
router.put(
  "/:postId/comments/:id",
  authenticateToken,
  postController.updateComment
);
router.delete(
  "/:postId/comments/:id",
  authenticateToken,
  postController.deleteComment
);

module.exports = router;
