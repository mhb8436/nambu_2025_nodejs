// POST/COMMENT 전용 REST ENDPOINT
const express = require("express");
const models = require("./models");
const app = express();
const PORT = 3000;
app.use(express.json());
// route add
app.post("/posts", async (req, res) => {
  const { title, content } = req.body;
  // 원래는 jwt 토근에서 사용자 ID를 받아와서 넣어줘야 하지만
  // 아직 안배워서 사용자를 생성하고 그다음에 게시글을 넣겠습니다.
  let user = await models.User.findOne({
    where: { email: "a@example.com" },
  });
  if (!user) {
    user = await models.User.create({
      name: "이지훈",
      email: "a@example.com",
      password: "12345678",
    });
  }
  const post = await models.Post.create({
    title: title,
    content: content,
    authorId: user.id,
  });
  res.status(201).json({ message: "ok", data: post });
});

app.get("/posts", async (req, res) => {
  const posts = await models.Post.findAll();
  res.status(200).json({ message: "ok", data: posts });
});

app.get("/posts/:id", async (req, res) => {
  const id = req.params.id;
  const post = await models.Post.findByPk(id);
  if (!post) {
    return res.status(404).json({ message: "post not found" });
  }
  res.status(200).json({ message: "ok", data: post });
});

// 게시글 수정
app.put("/posts/:id", async (req, res) => {
  const id = req.params.id;
  const { title, content } = req.body;
  const post = await models.Post.findByPk(id);
  if (post) {
    if (title) post.title = title;
    if (content) post.content = content;
    await post.save();
    res.status(200).json({ message: "ok", data: post });
  } else {
    res.status(404).json({ message: "post not found" });
  }
});

// 게시글 삭제

// add route
app.listen(PORT, () => {
  console.log(`server is listening on ${PORT}`);
  models.sequelize
    .sync({ force: false })
    .then(() => {
      console.log("DB connected");
    })
    .catch(() => {
      console.error("DB error");
      process.exit();
    });
});
