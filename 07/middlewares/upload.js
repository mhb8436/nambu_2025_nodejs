// 업로드 관련 미들웨어
const multer = require("multer");
const path = require("path");
const uploadDir = `public/uploads`;

const storage = multer.diskStorage({
  destination: `./${uploadDir}`,
  filename: function (req, file, cb) {
    const fname =
      path.parse(file.originalname).name +
      "-" +
      Date.now() +
      path.extname(file.originalname);
    cb(
      null, // Error
      fname
    );
  },
});

const upload = multer({ storage: storage });
const uploadSingle = upload.single("file");

module.exports = {
  uploadSingle,
};
